//判断数字是否在范围内
export function isIncludesNum(num, arr) {
    let f = arr.filter((a, i) => { return num >= a[0] && num <= a[1] })
    return f.length > 0
}