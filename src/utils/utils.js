export function isIncludesNum(num, arr) {
    let f = arr.filter((a, i) => { return num >= a[0] && num <= a[1] })
    return f.length > 0
}
export function isEmail(email) {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g
    return reg.test(email)
}

export function subStr(str) {
    const str1 = str.substring(0, 5)
    const str2 = str.substring(str.length - 6, str.length - 1)
    return str1 + '...' + str2
}
export function randomNum(min, max) {
    const tmp = JSON.parse(sessionStorage.getItem('randomNum')) || 0
    let num = function () {
        const r = Math.floor(Math.random() * (max - min + 1) + min);
        if (tmp === r) {
            num()
        } else return r
    }
    const random = num()
    sessionStorage.setItem('randomNum', random)
    return random

}