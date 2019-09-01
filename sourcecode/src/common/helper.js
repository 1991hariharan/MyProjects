 const  capitalize = (s) => {
    s = s.toLowerCase();
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
const sumOfArray = arr => arr.reduce((a,b) => a + b, 0);
export const Helper = {
    capitalize,
    sumOfArray
}