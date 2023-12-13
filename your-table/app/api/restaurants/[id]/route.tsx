import { NextResponse } from "next/server";
import executeQuery from "../../users/bd";
import ConvertData from "../convertData";


export async function GET(req: Request, { params }: {params: { id: string }}) {
    const res : any = await executeQuery(`
    select rs.id as resId, 
    rs.title as nameRest, 
    rs.unique_key as uKey, 
    companys.title as chainName,
    chain_restaurants.title as companysName,
    rs.create_time as createTime,
    rs.coordinate,
    rs.photos arrPhotos,
    rs.address,
    GROUP_CONCAT(distinct type_kitchen.type) as typeKitchen,
    GROUP_CONCAT(days.title," ",work_schedules.time_begin," ",work_schedules.time_end) as schedules
from restaurants as rs 
left join kitchen_list on rs.id = kitchen_list.restaurant_fk
left join type_kitchen on type_kitchen.id = kitchen_list.kitchen_type_fk
left join chain_restaurants on chain_restaurants.id = rs.company_chain_fk
left join companys on chain_restaurants.company_fk = companys.id
left join work_schedules on rs.id = work_schedules.restaurant_fk
left join days on work_schedules.day_fk = days.id
    where rs.id = ${params.id}
    group by rs.id,kitchen_list.id,type_kitchen.id,chain_restaurants.id,companys.id
    `, [])

    const restData = await ConvertData(res);
    return NextResponse.json(restData)
}