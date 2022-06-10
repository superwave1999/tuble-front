export function formatMoveStat(amount, blockMultiplier, sign = '+') {
    const total = amount * blockMultiplier;
    return `${sign}${total} (${amount} x${blockMultiplier})`; 
}