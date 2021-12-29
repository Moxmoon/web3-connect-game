<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
    font-family: Perfect;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
}
#walletconnect-qrcode-modal .walletconnect-modal__base {
    max-height: calc(100% - 100px);
    top: calc(50% + 22px);
}
#walletconnect-qrcode-modal .walletconnect-qrcode__image {
    max-width: calc(100% - 400px);
}
</style>
