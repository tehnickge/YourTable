import { NextResponse } from "next/server";
import executeQuery from "./bd";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('username');
    const pass = searchParams.get('password');

    const res : any = await executeQuery(
    `select users.id, users.name, users.password, users.date_create, user_types.type 
    from users 
    join user_types on user_types.id = users.user_type_fk
    where 
    users.name = "${name}" and
    users.password = "${pass}" `, []);
    const user = res[0];
    return NextResponse.json(res);
}
