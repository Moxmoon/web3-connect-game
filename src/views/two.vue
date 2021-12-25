<template>
  <div class="wrapper">
    <transition name="fade">
      <h1 v-if="show1"
          style="margin-bottom:40px">ETHANIM</h1>
    </transition>
    <!-- 移动端显示 -->
    <template v-if="isMobileView">
      <transition name="fade">
        <h3 v-if="show2">Eternalize the Application</h3>
      </transition>
      <transition name="fade">
        <h3 v-if="show2">Decentralize the Metaverse</h3>
      </transition>
      <transition name="fade">
        <h3 v-if="show2"
            style="margin-top:30px;">-</h3>
      </transition>
    </template>
    <!-- pc端 -->
    <template v-else>
      <transition name="fade">
        <h3 v-if="show2"
            style="margin-bottom:120px">Eternalize the Application | Decentralize the Metaverse</h3>
      </transition>
    </template>
    <!-- 文字说明 -->
    <p v-for="(item,index) in typewriter"
       :key="index">
      <span v-for="(k,i) in item"
            :key="i"
            :class="[{'highlight':highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index])}]">{{k}}</span>
    </p>
    <!-- 按钮 -->
    <transition name="fade">
      <div class="btn-group"
           v-show="show3">
        <div class="button"
             @click="jumpEnd">Already played</div>
        <div class="button"
             @click="popupVisible=true">Connect wallet</div>
        <div class="button"
             @click="jumpCup">Connect later</div>
      </div>
    </transition>
    <!-- 弹窗 -->
    <wallet-popup :visible="popupVisible"
                  @close="popupVisible=false"></wallet-popup>
  </div>
</template>
<script>
import { isIncludesNum } from '@/utils/utils'
import WalletPopup from '@/components/WalletPopup.vue'

export default {
    components: { WalletPopup },
    data() {
        return {
            popupVisible: false,
            show1: false,
            show2: false,
            show3: false,
            isMobileView: false, //是否是移动端
            words: [
                "Before we start let's run a simple simulation of present blockchain based applications.",
                "Let's play a shell game. ",
                'If you win 3 consecutive times, I will give you 1 ETH.',
                'Connect your web 3.0 wallet e.g. Metamask or Trustwallet or etc to begin. '
            ],
            keys: ['win 3 consecutive times', '1 ETH'],
            fadeWait: 800,
            wait: 30, //打字时间
            row: 0,
            col: 0,
            typewriter: [],
            highlight: {}, //高亮范围 {1:[[2,3],[5,8]]}
            timer: null
        }
    },
    created() {
        this.isMobile()
        window.onresize = () => {
            this.isMobile()
        }
    },
    mounted() {
        this.show1 = true
        setTimeout(() => {
            this.show2 = true
        }, this.fadeWait)
        setTimeout(() => {
            this.typing()
        }, this.fadeWait * 2)
    },
    methods: {
        isIncludesNum,
        typing() {
            this.$forceUpdate()
            if (this.row < this.words.length) {
                if (this.col <= this.words[this.row].length) {
                    const str = this.words[this.row].slice(0, this.col++)
                    this.typewriter[this.row] = str
                    this.timer = setTimeout(() => {
                        this.typing()
                    }, this.wait)
                } else {
                    this.row++
                    this.col = 0
                    let arr = []
                    this.keys.forEach((k, i) => {
                        if (
                            this.words[this.row] &&
                            this.words[this.row].includes(k)
                        ) {
                            const index = this.words[this.row].indexOf(k)
                            let endIndex = 0
                            if (index !== -1) {
                                endIndex = index + k.length - 1
                            }
                            arr.push([index, endIndex])
                        }
                    })
                    if (arr.length > 0) {
                        this.highlight[this.row] = arr
                    }
                    this.typing()
                }
            } else {
                clearTimeout(this.timer)
                this.show3 = true
            }
        },
        isMobile() {
            const width = document.documentElement.clientWidth
            if (width > 960) {
                this.isMobileView = false
            } else {
                this.isMobileView = true
            }
        },
        jumpEnd() {
            this.$router.push('/five')
        },
        jumpCup() {
            sessionStorage.removeItem('accounts')
            this.$router.push('/three')
        }
    }
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 960px) {
    .wrapper,
    .btn-group {
        margin-top: 200px;
    }

    h3 {
        font-size: 22px;
        line-height: 22px;
    }
    p {
        font-size: 16px;
        line-height: 16px;
        margin: 20px 0;
    }
    .button {
        font-size: 16px;
        line-height: 50px;
        width: 180px;
        height: 50px;
        border-radius: 4px;
        margin-left: 30px;
        margin-right: 30px;
    }
}
</style>