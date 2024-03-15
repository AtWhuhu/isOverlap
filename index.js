const dayjs = require('dayjs')
function secondsSinceMidnight(time) {
    var parts = time.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    return hours * 3600 + minutes * 60;
}
function isOverlap(shiftA, shiftB) {
    let A_base_date = "1970-01-01"
    let A_start = dayjs(`${A_base_date} ` + shiftA.start).valueOf();

    let A_isOver =secondsSinceMidnight(shiftA.start)>secondsSinceMidnight(shiftA.end)

    let A_end_base_date = A_isOver?"1970-01-02":A_base_date

    let A_end = A_isOver ? dayjs(`${A_end_base_date} ` + shiftA.end).valueOf() : dayjs(`${A_base_date} ` + shiftA.end).valueOf();

    let B_base_date = A_end_base_date

    let B_start = dayjs(B_base_date + shiftB.start).valueOf();

    let B_isOver =secondsSinceMidnight(shiftB.start)>secondsSinceMidnight(shiftB.end)

    let B_end_base_date = B_isOver?dayjs(B_base_date).add(1, 'day').format('YYYY-MM-DD'):dayjs(B_base_date).format('YYYY-MM-DD')

    let B_end = dayjs(`${B_end_base_date} ${shiftB.end}`).valueOf()
   
    console.log(`${dayjs(A_start).format('YYYY-MM-DD HH:mm')} : ${dayjs(A_end).format('YYYY-MM-DD HH:mm')}  -  ${dayjs(B_start).format('YYYY-MM-DD HH:mm')} : ${dayjs(B_end).format('YYYY-MM-DD HH:mm')}`)

    if(
        (A_base_date===B_end_base_date&&
            A_start<=A_end<=B_start<=B_end)||
        (A_base_date!==B_end_base_date&&
            A_start<=A_end<=B_start<=B_end&&secondsSinceMidnight(shiftA.start)>=secondsSinceMidnight(shiftB.end)
            )
    ){
        console.log('未重叠')
    }else{
        console.log('有重叠')
    }
}



let shiftA =  {start: "23:30", end: "11:30"}
let shiftB = {start: "12:00", end: "23:40"}

isOverlap(shiftA, shiftB)