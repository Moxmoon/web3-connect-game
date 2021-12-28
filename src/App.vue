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
    height: calc(100% - 72px);
    top: calc(50% + 32px);
}
</style>
