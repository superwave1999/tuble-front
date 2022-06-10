import dayjs from 'dayjs';

export function calculateTime(timeLog, asTimestamp = false, current = true) {
    let total = 0;
    for (let i = 0; i < timeLog.length; i++) {
        if (i % 2 !== 0) {
            continue
        }
        const nextIndex = i + 1;
        if (timeLog[nextIndex]) {
            total += timeLog[nextIndex].diff(timeLog[i]);
        } else if (current) {
            total += dayjs().diff(timeLog[i]);
        }
    }
    if (asTimestamp) {
        return total;
    } else {
        return dayjs(total).format('mm:ss')
    }
}

export function instantiateTimeLog(timeLog) {
    return timeLog.map((strTime) => {
        return dayjs(strTime);
    })
}