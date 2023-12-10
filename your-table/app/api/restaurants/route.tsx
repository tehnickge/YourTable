import { NextResponse } from "next/server";
import executeQuery from "../users/bd";

export async function GET(req: Request) {
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
    type_kitchen.type as typeKitchen,
    GROUP_CONCAT(days.title," ",work_schedules.time_begin," ",work_schedules.time_end) as schedules,
	GROUP_CONCAT(work_schedules.time_begin) as timeBegin,
    GROUP_CONCAT(work_schedules.time_end) as timeEnd
    from restaurants as rs 
        left join kitchen_list on kitchen_list_fk = rs.id
        left join type_kitchen on type_kitchen.id = kitchen_list.kitchen_type_fk
        left join chain_restaurants on chain_restaurants.id = rs.company_chain_fk
        left join companys on chain_restaurants.company_fk = companys.id
        left join work_schedules on rs.id = work_schedules.restaurant_fk
        left join days on work_schedules.day_fk = days.id
	        group by rs.id,type_kitchen.id,chain_restaurants.id`, [])
    
    res.map((item : any) => {
        if(item.schedules) { 
            console.log((item?.schedules.split(","))); 
            item.schedules = item?.schedules.split(",")
            let aboba : Array<any>;
            item.schedules.map((el : any) => {
                console.log(")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))");
                let aboba = el.split(' ');
                console.log(aboba)
            });
        }
    });

    res.map((item :any ) => {
    })


    return NextResponse.json(res);
}