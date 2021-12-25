<template>
  <div class="wrapper">
    <p v-for="(item,index) in typewriter"
       :key="index">
      <span v-for="(k,i) in item"
            :key="i"
            :class="[{'highlight':highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index])}]">{{k}}</span>
    </p>
    <transition name="fade">
      <div class="btn-group">
        <div class="button"
             v-if="show"
             @click="$router.push('/five')">Enter</div>
      </div>
    </transition>
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
                "It's not your fault. The system changed its logic when it saw you were almost winning.",
                'The blockchain is decentralized but server-side codes are still on private servers.',
                'The present blockchain applications can change their server codes anytime they want.',
                'If we are to truly embrace Metaverse,',
                'We need decentralized code reliability on all servers.',
                'Ethanim is realizing a true decentralized Metaverse.'
            ],
            keys: ['decentralized code reliability'],
            wait: 30, //打字时间
            row: 0,
            col: 0,
            typewriter: [],
            highlight: {}, //高亮范围 {1:[[2,3],[5,8]]}
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
        }
    }
}
</script>
<style lang="less" scoped>
.wrapper {
    text-align: left;
}
.btn-group {
    text-align: center;
    margin-top: 200px;
}
@media screen and (min-width: 960px) {
    .wrapper {
        margin-top: 160px;
        margin-left: 160px;
    }
    p {
        font-size: 24px;
        line-height: 24px;
        margin: 20px 0;
    }
    .button {
        font-size: 16px;
        line-height: 50px;
        width: 160px;
        height: 50px;
        border-radius: 4px;
    }
}
</style>