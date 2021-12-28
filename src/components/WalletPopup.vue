<template>
  <div v-if="visible"
       class="popup-wrapper">
    <div class="mask-bg"></div>
    <div class="popup-container">
      <div class="popup-header">
        <span>Connect to a wallet</span>
        <img :src="require('@/assets/images/close.png')"
             alt="close"
             width="30"
             class="pointer"
             @click="closePopup">
      </div>
      <div class="popup-main">
        <div class="wallet-item"
             @click="handleMetaMask">
          <span>MetaMask</span>
          <img :src="require('@/assets/images/meta.png')"
               alt="MetaMask">
        </div>
        <div class="wallet-item"
             @click="handleWalletConnect">
          <span>WalletConnect</span>
          <img :src="require('@/assets/images/wallet.png')"
               alt="WalletConnect">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { subStr } from '@/utils/utils'
export default {
    props: ['visible'],
    data() {
        return {
            infuraId: '27e484dcd9e3efcfd25a83a78777cdf1'
        }
    },
    methods: {
        closePopup() {
            this.$emit('close')
        },
        // metaMask
        async handleMetaMask() {
            console.log(window.ethereum, 'ethereum')
            if (typeof window.ethereum === 'undefined') {
                //如果没有安装MetaMask插件，则跳转提示安装chrome的MetaMask插件
                let opener = window.open('https://metamask.io/')
                opener = null
            } else {
                console.log('start')
                const providerOptions = {}
                const web3Modal = new Web3Modal({
                    network: 'mainnet', // optional
                    cacheProvider: true, // optional
                    providerOptions // required
                })
                console.log('web3Modal')
                const provider = await web3Modal.connect()
                console.log(provider, 'provider')
                //  Create Web3
                const web3 = new Web3(provider)
                const accounts = await web3.eth.getAccounts()
                // console.log(accounts, 'accounts')
                if (accounts && accounts.length > 0) {
                    sessionStorage.setItem('accounts', subStr(accounts[0]))
                }
                this.$router.push('/three')
            }
        },
        // walletConnect
        async handleWalletConnect() {
            const provider = new WalletConnectProvider({
                infuraId: this.infuraId // Required
            })
            //  Enable session (triggers QR Code modal)
            await provider.enable()
            //  Create Web3
            const web3 = new Web3(provider)
            const accounts = await web3.eth.getAccounts()

            if (accounts && accounts.length > 0) {
                sessionStorage.setItem('accounts', subStr(accounts[0]))
            }
            this.$router.push('/three')
        }
    }
}
</script>

<style lang="less" scoped>
.popup-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.59);
        z-index: 1;
    }
    .popup-container {
        z-index: 99;
        width: 400px;
        height: 250px;
        background: #222222;
        border-radius: 4px;
        border: 1px solid #ffffff;
        display: flex;
        flex-direction: column;
        .popup-header {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 6px 12px 0 12px;
            span {
                font-size: 18px;
                line-height: 18px;
            }
        }
        .popup-main {
            z-index: 100;
            margin: 6px;
            flex: 1;
            background: #000000;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .wallet-item {
                cursor: pointer;
                width: 56%;
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
                padding: 0 12px;
                border: 1px solid #ffffff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &:first-child {
                    margin-bottom: 18px;
                }
            }
        }
    }
}
@media screen and(max-width:750px) {
    .popup-wrapper {
        .popup-container {
            width: 80%;
            max-width: 700px;
            height: 460px;
            .popup-header {
                height: 60px;
                margin: 10px 20px 0 20px;
                span {
                    font-size: 32px;
                    line-height: 32px;
                }
                img {
                    width: 50px;
                }
            }
            .popup-main {
                margin: 10px;
                .wallet-item {
                    height: 76px;
                    padding: 0 20px;
                    &:first-child {
                        margin-bottom: 50px;
                    }
                    span {
                        font-size: 28px;
                        line-height: 28px;
                    }
                }
            }
        }
    }
}
</style>