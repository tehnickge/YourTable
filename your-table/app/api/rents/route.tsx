import { NextResponse } from "next/server";
import executeQuery from "../users/bd";
import moment from "moment";

// export async function POST(req : Request) {
//     const { searchParams } = new URL(req.url);
//     const name = searchParams.get('username');
//     const pass = searchParams.get('password');
//     const rentId = 3;
//     const slots = [2,3,4];
//     const timesFrom = moment();
//     const timeTo = moment().add(1,"day");
//     const rents : any = await executeQuery(`
//          select * from rents
//          join slots_rent_list on slots_rent_list.rent_fk = rents.id
//          join slots on slots_rent_list.slots_fk = slots.id
//          where ${slots.map((slotId : number) => `slots.id = ${slotId}`).join(" or ")}
//     `, []);
//     for(const rent of rents) {
//         if(!(!moment(rent.time_of_rent_start).isBefore(timeTo) || 
//         !moment(rent.time_of_rent_end).isAfter(timesFrom))) { return NextResponse.json({error: ";("}, {status: 409})}
//     }
//     slots.map(async (slot) => {
//         const rent = await executeQuery(`
//         insert into slots_rent_list(slots_fk,rent_fk)
//         values
//         (${rentId},${slot});
//         select last_insert_id()
//     `,[])
//     })        
    
    

//     return NextResponse.json(rents);
// }