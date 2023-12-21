import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: Request, { params }: {params: { id: string }}) {
    const user = await prisma.restaurant.findUnique({
        select:{
          id: true,
          title: true,
          address: true,
          info: true,
          photos: true,
          kitchens: true,
          zones: {
            select: {
              id: true,
              restaurantId: true,
              discription: true,
              slots: true,
            }
          },
          chain: {
            select: {
              id: true,
              title: true,
              company: true
            }
          }
        },
        where: {
            id: Number(params.id)
        }
      });
    return NextResponse.json(user)
}