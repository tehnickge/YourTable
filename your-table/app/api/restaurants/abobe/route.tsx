import { NextResponse } from "next/server"
import executeQuery from "../../users/bd"

export async function GET(req: Request) {
    const res : any = await executeQuery(`
    select
CAST(CONCAT('{"zones":','[',GROUP_CONCAT(distinct CONCAT_WS(',', json_object(
"zoneId",zones.id,
"zonesTitle", zones.title,
"slots", json_array(json_object(
	"slotId",slots.id,
	"slotTitle",slots.number
	))
)) order by zones.id),']','}') AS JSON) as kek
from restaurants as rs
left join zones on rs.id = zones.restaurant_fk
left join slots on zones.id = slots.zones_fk
where rs.id = 1
group by rs.id`,[])

    return NextResponse.json(res)
}
