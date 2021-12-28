
const baseSize = 16
function setRem() {
    let clientWidth = document.documentElement.clientWidth
    let scale = 1
    if (clientWidth < 750) {
        scale = clientWidth / 750
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    } else if (clientWidth < 960) {
        scale = clientWidth / 960
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    } else if (clientWidth < 1280) {
        scale = clientWidth / 1280
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    } else {
        scale = clientWidth / 1920
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    }
}
setRem()
window.onresize = function () {
    setRem()
}