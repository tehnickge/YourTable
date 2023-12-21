import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const kitchens = await prisma.kitchen.findMany({
      distinct: ['type'] 
    });
    return NextResponse.json(kitchens);
}