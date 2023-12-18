import { NextResponse } from "next/server";
import executeQuery from "../../users/bd";
import ConvertData from "../convertData";


export async function GET(req: Request, { params }: {params: { id: string }}) {
    const res : any = await executeQuery(`
    call getRestaurantById('${params.id}')
    `, [])
    let [restData,info] = await res;
    restData = await ConvertData(restData);
    return NextResponse.json(restData)
}