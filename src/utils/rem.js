// rem等比适配配置文件
// 基准大小
const baseSize = 16
// 设置 rem 函数
function setRem() {
    let clientWidth = document.documentElement.clientWidth
    const scale = clientWidth / 750
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    if (clientWidth < 960) {
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    }
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}