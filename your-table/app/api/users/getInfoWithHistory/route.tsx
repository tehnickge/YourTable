import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    const user = await prisma.user.findUnique({ 
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        name: true,
        password: true,
        photo: true,
        type: true,
        createdAt: true,
        Rent: {
            select: {
                restaurant: {
                  select: {
                    id: true,
                    title: true,
                    photos: true,
                    address: true
                  }
                },
                rentStatus: true,
                id: true,
                createdAt: true,
                timeStart: true,
                timeEnd: true,
                restaurantId: true,
                userId: true,
                slots: {
                  select: {
                    id: true,
                    slotId: true,
                    rentId: true,
                    slot: true,
                  }
                }
            }
        }
      }
    })
    if (!user) { return NextResponse.json(null, { status: 404 });} else {
      return NextResponse.json({user})
    }

}
