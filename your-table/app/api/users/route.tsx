import { NextResponse } from "next/server";
import executeQuery from "./users";

export async function GET(req: Request) {
    const res = await executeQuery(
    `select users.id, users.name, users.password, users.date_create, user_types.type 
    from users 
    join user_types on user_types.id = users.user_type_fk`, []);
    return NextResponse.json(res);
}