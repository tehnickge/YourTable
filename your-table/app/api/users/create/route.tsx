import { NextResponse } from "next/server";
import executeQuery from "../users";

export async function POST(req: Request, res: Response) {
    console.log(req.body);
    return NextResponse.json(req);
}
