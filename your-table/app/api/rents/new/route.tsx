import prisma from "@/lib/prisma";
import moment from "moment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()
    const dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
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