import { NextResponse } from "next/server";
import executeQuery from "../bd";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    return NextResponse.json( { body } );
}

// export async function GET(req: Response) {
//     const { searchParams } = new URL(req.url)
//     const query = searchParams.get('q');
//     let curent = executeQuery("select * from users",[])
//     if (query) {
        
//     }
// }