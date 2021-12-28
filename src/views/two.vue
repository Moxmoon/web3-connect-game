<template>
  <div class="wrapper">
    <transition name="fade">
      <h1 v-if="show1"
          class="title">ETHANIM</h1>
    </transition>
    <!-- mobile -->
    <template v-if="isMobileView">
      <transition name="fade">
        <h4 v-if="show2">Eternalize the Application</h4>
      </transition>
      <transition name="fade">
        <h4 v-if="show2">Decentralize the Metaverse</h4>
      </transition>
      <transition name="fade">
        <h4 v-if="show2"
            style="margin-top:3rem;margin-bottom:3rem">-</h4>
      </transition>
    </template>
    <!-- pc -->
    <template v-else>
      <transition name="fade">
        <h4 v-if="show2">Eternalize the Application | Decentralize the Metaverse</h4>
      </transition>
    </template>
    <!-- text -->
    <div class="flex-column text-wrapper flex1">
      <p v-for="(item,index) in typewriter"
         :key="index">
        <template v-for="(k,i) in item">
          <template v-if="!(highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index]))">{{k}}</template>
          <span :key="i"
                v-else
                :class="['notranslate',{'highlight':highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index])}]">{{k}}</span>
        </template>
      </p>
    </div>
    <!-- button -->
    <div class="btn-group">
      <template v-if="show3">
        <transition name="fade">
          <div class="buttons">
            <div class="button"
                 :key="1"
                 @click="popupVisible=true">Connect wallet</div>
            <div class="button"
                 :key="2"
                 @click="jumpCup">Connect later</div>
            <div class="button"
                 :key="3"
                 @click="jumpEnd">Already played</div>
          </div>
        </transition>
      </template>
    </div>
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
            if (width > 749) {
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
.wrapper {
    align-items: center;
    padding: 7.38rem 3.13rem;
}
.text-wrapper {
    text-align: left;
    width: 800px;
}
h1 {
    margin-bottom: 2.06rem;
}
h4 {
    margin-bottom: 7.56rem;
}
@media screen and(max-width:749px) {
    h4 {
        margin-bottom: 0.63rem;
    }
    .text-wrapper {
        width: 94%;
    }
    .btn-group {
        .buttons {
            display: flex;
            flex-direction: column;
            .button {
                width: 14rem;
            }
        }
    }
}
</style>