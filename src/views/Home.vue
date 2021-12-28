<template>
  <div class="wrapper">
    <p v-for="(item,index) in typewriter"
       :key="index">
      <template v-for="(k,i) in item">
        <template v-if="!(highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index]))">{{k}}</template>
        <span :key="i"
              v-else
              :class="['notranslate',{'highlight':highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index])}]">{{k}}</span>
      </template>
      <span class="blink"
            v-if="index+1===typewriter.length&&show">_</span>
    </p>

  </div>
</template>
<script>
import { isIncludesNum } from '@/utils/utils'
export default {
    data() {
        return {
            show: false,
            words: [
                '......',
                'Systems initializing...',
                'Loading reliability cores...',
                'Connecting to wallet security...',
                'Generating hashing protocols...',
                'Initializing Ethanim OS 1.0...',
                ''
            ],
            keys: ['Ethanim'],
            wait: 25,
            row: 0,
            col: 0,
            typewriter: [],
            highlight: {},
            timer: null
        }
    },
    mounted() {
        const uerAgent = navigator.userAgent.toLowerCase()
        const reg =
            /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/g
        if (!reg.test(uerAgent)) {
            this.words[this.words.length - 1] = 'Press any key to start'
        } else {
            this.words[this.words.length - 1] = 'Click anywhere to start'
        }
        this.typing()
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
                setTimeout(() => {
                    this.show = true
                    //监听键盘事件
                    window.addEventListener('keydown', this.jump)
                    //监听移动端触摸事件
                    window.addEventListener('touchend', this.jump)
                }, this.wait)
            }
        },
        jump() {
            this.$router.push('./two')
        }
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.jump)
        window.removeEventListener('touchend', this.jump)
        this.timer && clearTimeout(this.timer)
    }
}
</script>
<style lang="less" scoped>
.wrapper {
    align-items: flex-start;
    padding: 3.13rem 3.75rem;
}

.blink {
    animation: blink 0.75s infinite steps(1, start);
}
@keyframes blink {
    0% {
        opacity: 1;
        display: block;
    }
    50% {
        opacity: 0;
        display: none;
    }
    100% {
        opacity: 1;
        display: block;
    }
}
</style>
