import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: {params: { id: string }}) {
    // const { searchParams } = new URL(req.url);
    // const name = searchParams.get('username');
    // const pass = searchParams.get('password');

    // const res = await executeQuery(
    // `select users.id, users.name, users.password, users.date_create, user_types.type 
    // from users 
    // join user_types on user_types.id = users.user_type_fk
    // where 
    // users.id = ${params?.id} and
    // users.name = "${name}" and
    // users.password = "${pass}" `, []);
    // const user = res[0];

    const user = await prisma.user.findUnique({ 
      where: {
        id: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        password: true,
        photo: true,
        type: true,
        createdAt: true
      }
    })
    if (!user) { return NextResponse.json(null, { status: 404 });} else {
      return NextResponse.json({user})
    }

}
