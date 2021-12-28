<template>
  <div class="wrapper">
    <div>
      <p v-for="(item,index) in typewriter"
         :key="index">
        <template v-for="(k,i) in item">
          <template v-if="!(highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index]))">{{k}}</template>
          <span :key="i"
                v-else
                :class="['notranslate',{'highlight':highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index])}]">{{k}}</span>
        </template>
        <br v-if="index===1||index===5"></br>
      </p>
    </div>
    <div class="btn-group flex1 flex flex-center">
      <transition name="fade">
        <template v-if="show">
          <div class="button"
               id="enter"
               @click="jump">Enter</div>
        </template>
      </transition>
    </div>
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
                "Couldn't win, hah?",
                "It's not your fault - this is the present condition.",
                'The system cheated, foreseeing your win.',
                'Server-side codes are still on private servers.',
                'Those codes can be tampered with anytime.',
                'If we are to embrace Metaverse truly,',
                'We need decentralized code reliability on all servers.'
            ],
            keys: ['decentralized code reliability'],
            wait: 15,
            row: 0,
            col: 0,
            typewriter: [],
            highlight: {}, // {1:[[2,3],[5,8]]}
            timer: null
        }
    },
    mounted() {
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
                this.show = true
            }
        },
        jump() {
            this.$router.push('/five')
        }
    }
}
</script>
<style lang="less" scoped>
.wrapper {
    align-items: flex-start;
    padding: 3.13rem 3.75rem;
    p {
        text-align: left;
    }
    .btn-group {
        text-align: center;
        width: 100%;
    }
}
@media screen and (max-width: 749px) {
    .btn-group {
        width: 100%;
    }
}
</style>