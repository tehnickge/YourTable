import moment from "moment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()
    console.log(body);
    const dateNow = moment().format("YYYY-MM-DD");
    if(moment(body.startDate, "YYYY-MM-DD").isBefore(dateNow)) { return NextResponse.json({"error" : "not valid date"})}

    return NextResponse.json({"kek" : "lol"})
}