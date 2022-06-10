import dayjs from 'dayjs';

export function formatTimeStat(ms, multiplier, sign = '+') {
    const timePerBlock = dayjs(ms).format('ss');
    const totalTime = dayjs(ms * multiplier).format('mm:ss');
    return `${sign}${totalTime} (${timePerBlock}s x${multiplier})`; 
}