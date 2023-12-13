export default async function ConvertData(res : any) {
    res?.forEach((item : any) => {
        //make pretty schedules
        if(item?.zones) {
            //
            let tmp = item.zones.split(',');
            //change type to array
            item.zones = [];

            tmp = tmp.map((i : any) => { return i.split(' ')});
            tmp.map((zones : any) => {
                const [zoneId, zoneTitle] = zones;
                let zone = {
                    zoneId: Number(zoneId),
                    zoneTitle: zoneTitle
                }
                item.zones.push(zone);

            })
            if(item?.slots) {
                let slots = item.slots.split(',');
                slots = slots.map((slot : any) => { return slot.split(' ') })
                item.slots = [];
                slots.map((i: any) => {
                    const [zoneId, slotId, slotTitle, maxPeopleInSlot] = i
                    let slot = {
                        zoneId: Number(zoneId),
                        slotId: Number(slotId),
                        slotTitle: slotTitle,
                        maxPeopleInSlot: Number(maxPeopleInSlot)
                    }
                    item.slots.push(slot);
                })
            }
            if(item?.typeKitchen) {
                item.typeKitchen = item.typeKitchen.split(',');
            }
        }
    });
    return res;
}