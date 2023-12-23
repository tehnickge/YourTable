import prisma from "@/lib/prisma";
import moment from "moment";
import { NextResponse } from "next/server";

const generateTimeArray = async(timeStart : any, timeEnd : any, date: any, restId : any, slotId : any) => {
    if(moment.utc(timeStart, "HHmm").isAfter(moment.utc(timeEnd,"HHmm"))) { return NextResponse.json({"error" : "bad schedule"})}

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
    const checkToDay = await RentPerDay.filter((rent)=> {
        return(moment.utc(rent.timeStart,"YYYY-MM-DD").format("YYYY-MM-DD") === moment(date,"YYYY-MM-DD").format("YYYY-MM-DD"))
    })
  
    if(checkToDay.length !== 0) { return []}

    let tmpTime = await moment.utc(timeStart,"HHmm");

    // if this date = rent day
    if(moment(date, "YYYY-MM-DD").isSame(moment.utc().format("YYYY-MM-DD"))) {
        //@ts-ignore
        tmpTime = await moment.utc().format("HH");
    } else {
        tmpTime = await moment.utc(timeStart,"HHmm");
    }

    const arrTimes = [];

    while(moment.utc(timeEnd,"HHmm").isSameOrAfter(moment.utc(tmpTime,"HHmm"))) {
        arrTimes.push(moment(tmpTime, "HHmm").format("HH:mm"));
        tmpTime = await moment(tmpTime, "HHmm").add(1,"h")
    } 
    return await arrTimes
}

export async function POST(req: Request) {
    const body = await req.json()
    const dateNow = moment().format("YYYY-MM-DD");
    if(moment(body.startDate, "YYYY-MM-DD").isBefore(dateNow)) { return NextResponse.json({"error" : "not valid date"})};

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
    console.log(thisDayOfWeek);
    const arrWithTime = await generateTimeArray(thisDayOfWeek[0].timeBegin,thisDayOfWeek[0].timeEnd, body.startDate, body.restaurantId, body.selectedSlot)
    console.log(await arrWithTime)

    return NextResponse.json(arrWithTime);
}