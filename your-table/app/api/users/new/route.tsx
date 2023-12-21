import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const cName = body.name;
    const cPass = body.pass;
    const cPhoto = body.photo;
    const check = await prisma.user.findUnique({
        where: {
            name: cName
        },
        select: {
            name: true,
            type: true
        }
    })
    if(check) { return NextResponse.json(null, { status: 404 });}
    const user = await prisma.user.create({
        data: {
            name: cName,
            password: cPass,
            photo: cPhoto || null
        },
    }) 
    return NextResponse.json( { user } );
}

// export async function GET(req: Response) {
//     const { searchParams } = new URL(req.url)
//     const query = searchParams.get('q');
//     let curent = executeQuery("select * from users",[])
//     if (query) {
        
//     }
// }
