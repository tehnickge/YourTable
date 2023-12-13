export default async function ConvertData(res : any) {
    res?.forEach((item : any) => {
        //make pretty schedules
        if(item?.zones) {
            console.log("________Item ZONES__________");
            let tmp = item.zones.split(',');
            let tmp1 = [];
            tmp.forEach((i : any) => {tmp1.push(i.split(' '));});
            console.log(tmp);
            item.zones = {}
            if(item?.slots) {

            }
        }
    });
    return res;
}