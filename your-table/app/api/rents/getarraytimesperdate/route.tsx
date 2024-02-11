import prisma from "@/lib/prisma";
import moment from "moment";
import { NextResponse } from "next/server";

const generateTimeArray = async(timeStart : any, timeEnd : any, date: any, restId : any, slotId : any) => {
    //all rents 
    const RentPerDay = await prisma.rent.findMany({
       where: {
        restaurantId: restId,
        slots: {
            some: {
                slotId: slotId
            }
        }
       },
       include: {
        slots: true
       }
    });

    // check in to day
    const checkToDay = await RentPerDay.filter((rent)=> {
        return(moment.utc(rent.timeStart,"YYYY-MM-DD").format("YYYY-MM-DD") === moment(date,"YYYY-MM-DD").format("YYYY-MM-DD"))
    })
  
    if(checkToDay.length !== 0) { return []}

    let tmpTime = await moment.utc(timeStart,"HHmm");

    // if this date = rent day
    if(moment(date, "YYYY-MM-DD").isSame(moment.utc().format("YYYY-MM-DD"))) {
        //@ts-ignore
        tmpTime = await moment.utc(moment.utc(timeStart,"HHmm").hours(moment().format("HH")),"HHmm").add(1,"hour");
    } else {
        tmpTime = await moment.utc(timeStart,"HHmm");

    }

    const arrTimes = [];

    while(moment.utc(timeEnd).isSameOrAfter(moment.utc(tmpTime,"HH:mm"),"hour")) {
        arrTimes.push(moment(tmpTime, "HHmm").format("HH:mm"));
        tmpTime = await moment(tmpTime, "HHmm").add(1,"h")
    } 
    return await arrTimes
}

export async function POST(req: Request) {
    const body = await req.json()
    const dateNow = moment().format("YYYY-MM-DD");
    if(moment(body.startDate, "YYYY-MM-DD").isBefore(dateNow)) { return NextResponse.json({"error" : "not valid date"})};
    if(body.timeStart === null 
        || body.timeEnd === null 
        || body.date === null 
        || body.restId === null 
        || body.slotId === null
        ) 
    { return NextResponse.json({"error" : "bad data"})}
    if(moment.utc(body.startDate, "YYYY-MM-DD").isBefore(dateNow)) { return NextResponse.json({"error" : "bad date"}) };
    if(moment.utc(body.timeStart, "HHmm").isAfter(moment.utc(body.timeEnd,"HHmm"))) { return NextResponse.json({"error" : "bad schedule"})}

    const restaurants = await prisma.restaurant.findMany({
        where: {
            id: body.restId,
            zones: {
                some: {
                    slots: {
                        some:
                        {
                            id: body.slotId
                        }
                    }
                }
            }
            
        }
    })
    if (restaurants.length === 0) {return NextResponse.json({"error" : "bad id restaurant or slotsID"})}

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id: body.restaurantId
        },
        include: {
            workSchedulePerDay: {
                include: {
                    day: true
                }
            },
        },
    })

    if(!restaurant) { return NextResponse.json({"error": "restaurant not founded"})};
    
    const thisDayOfWeek = await restaurant.workSchedulePerDay.filter((shedule : any) => {
        return shedule.day.title === moment.utc(body.startDate,"YYYY-MM-DD").format("dddd")
    })
    const arrWithTime = await generateTimeArray(thisDayOfWeek[0].timeBegin,thisDayOfWeek[0].timeEnd, body.startDate, body.restaurantId, body.selectedSlot);

    return NextResponse.json(arrWithTime);
}