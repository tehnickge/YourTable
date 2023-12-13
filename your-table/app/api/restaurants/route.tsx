import { NextResponse } from "next/server";
import executeQuery from "../users/bd";
import ConvertData from "./convertData";

export async function GET(req: Request) {
    const res : any = await executeQuery(`
    call getAllRestaurants()
    `, []);
    let [restData,info] = res;
    restData = await ConvertData(restData);
    return NextResponse.json(res);
}