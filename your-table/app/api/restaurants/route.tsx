import { NextResponse } from "next/server";
import executeQuery from "../users/bd";
import ConvertData from "./convertData";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    // const res : any = await executeQuery(`
    // call getAllRestaurants()
    // `, []);
    const user = await prisma.restaurant.findMany({
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
        }
      });
    // let [restData,info] = res;
    // restData = await ConvertData(restData);
    return NextResponse.json(user);
}