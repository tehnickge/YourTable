import prisma from "@/lib/prisma";
import { timeEnd } from "console";
import moment from "moment";
import { NextResponse } from "next/server";

type Body = {
    startDate: any,
    slotId: any,
    timeBegin : any,
    timeEnd: any,
    restaurantId: any,
    userId: any,
}

export async function POST(req: Request) {
    const body : Body = await req.json()
    if (body.restaurantId === null 
        || body.slotId === null 
        || body.timeBegin === null 
        || body.timeEnd === null 
        || body.restaurantId === null 
        || body.userId === null ) 
    { return NextResponse.json({"error": "bad data"})}

    const restaurants = await prisma.restaurant.findMany({
        where: {
            id: body.restaurantId,
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

    const toDay = moment.utc().format("YYYY-MM-DD");
    if(moment.utc(body.startDate, "YYYY-MM-DD").isBefore(toDay)) { return NextResponse.json({"error" : "bad date"}) };
    
    const dateStart = moment([body.startDate, body.timeBegin], "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss.SSS")
    const dateEnd = moment([body.startDate, body.timeEnd], "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss.SSS")

    const checkRent = await prisma.rent.findMany({
        include: {
            slots: true,
        },
        where: {
            slots: {
                some: {
                    slotId: body.slotId
                },
            },
            restaurantId: body.restaurantId,
            timeStart: moment(dateStart).toISOString(),
        }
    });
    if(checkRent.length !== 0) {
        return NextResponse.json(null, { status: 404 })
    }
    const rent = await prisma.rent.create({
        data: {
            userId: body.userId,
            timeStart: moment(dateStart).toISOString(),
            timeEnd: moment(dateEnd).toISOString(),
            rentStatusId: 1,
            restaurantId: body.restaurantId,
            slots: {
                create: [
                    {
                        slotId: body.slotId,
                    },
                ],
            },
            
        },
    });

    return NextResponse.json({rentId: rent.id}, { status: 200 })
}