<template>
  <div class="game-wrapper">
    <div class="flex1 flex-column flex-center">
      <!-- 钱包账号 -->
      <transition name="fade">
        <p class="highlight"
           v-if="show1&&accounts">Wallet:
          <span style="word-break:break-all;display:inline-block">{{accounts}}</span>
        </p>
      </transition>
      <!-- 文字说明 -->
      <!-- <span style="display:inline-block">{{words[0]}}</span> -->
      <p v-for="(item,index) in typewriter"
         :key="index"
         class="text-wrapper">
        <span v-for="(k,i) in item"
              :key="i"
              :class="[{'highlight':highlight.hasOwnProperty(index)&&isIncludesNum(i,highlight[index])}]">{{k}}</span>
      </p>
    </div>
    <!-- 猜杯子游戏 -->
    <div class="guess-wrapper">
      <transition name="fade">
        <div v-show="show2">
          <h2 class="win-group highlight">
            Wins: {{winTimes}}
          </h2>
          <div class="cup-container">
            <div id="box1"
                 class="box"
                 @click="touchCup(1)">
              <div class="box-container">
                <img id="cup1"
                     class="cup"
                     :src="require('@/assets/images/cup.jpg')"
                     alt="">
                <img id="ball1"
                     class="ball"
                     v-show="cupOwner===1"
                     :src="require('@/assets/images/ball.png')"
                     width="30"
                     alt="">
              </div>
            </div>
            <div id="box2"
                 class="box"
                 @click="touchCup(2)">
              <div class="box-container">
                <img id="cup2"
                     class="cup"
                     :src="require('@/assets/images/cup.jpg')"
                     alt="">
                <img id="ball2"
                     class="ball"
                     v-show="cupOwner===2"
                     :src="require('@/assets/images/ball.png')"
                     width="30"
                     alt="">
              </div>
            </div>
            <div id="box3"
                 class="box"
                 @click="touchCup(3)">
              <div class="box-container">
                <img id="cup3"
                     class="cup"
                     :src="require('@/assets/images/cup.jpg')"
                     alt="">
                <img id="ball3"
                     class="ball"
                     v-show="cupOwner===3"
                     :src="require('@/assets/images/ball.png')"
                     alt="">
              </div>
            </div>
          </div>
          <p class="tips-wrapper">
            <transition name="fade">
              <span v-show="showTips">{{tip}}</span>
            </transition>
          </p>
          <div class="btn-group"
               v-if="showStart">
            <div class="button"
                 @click="start">Start</div>
          </div>
          <div v-show="isOver"
               class="btn-group">
            <div class="button"
                 @click="restart">Restart</div>
            <div class="button"
                 @click="giveUp">Give up</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { isIncludesNum } from '@/utils/utils'

export default {
    data() {
        return {
            show1: false,
            show2: false,
            showStart: true,
            showRestart: false,
            currentUpCup: null, //当前抬起的杯子
            cupOwner: null, // 藏有小球的杯子
            winTimes: 0, // 答对次数
            stopTouch: true, //是否禁止点击杯子
            isOver: false, //游戏结束
            cupChangeMaxNum: 10, //杯子交换次数
            cupChangeNum: 0, //杯子当前的交换次数
            itemxArray: [],
            showTips: false,
            tips: ['Choose the box with coin inside', 'Game Over'], //文案
            tip: '',
            timerCount: [], //定时器
            words: [
                'Now guess where is the ball right now. Continuously win 3 times, you win 1 ETH.'
            ],
            keys: ['Ethaim'], //关键字
            fadeWait: 800,
            wait: 30, //打字时间
            row: 0,
            col: 0,
            typewriter: [],
            highlight: {}, //高亮范围
            timer: null,
            accounts: null
        }
    },
    mounted() {
        this.accounts = sessionStorage.getItem('accounts')
        this.show1 = true
        setTimeout(() => {
            this.typing()
        }, this.fadeWait)
        let item1 = document.getElementById('box1')
        let item2 = document.getElementById('box2')
        let item3 = document.getElementById('box3')
        this.itemxArray = [item1, item2, item3]
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
                this.show2 = true
            }
        },
        restart() {
            if (this.isOver) {
                this.winTimes = 0
            }
            this.backUpCup(this.currentUpCup)
            this.timerCount[8] = setTimeout(() => {
                this.start()
            }, 1000)
        },
        start() {
            this.showStart = false
            this.tip = this.tips[0]
            this.showTips = true
            this.isOver = false
            this.cupOwner = Math.floor(Math.random() * 3 + 1)
            const cup = document.getElementById('cup' + this.cupOwner)
            const ball = document.getElementById('ball' + this.cupOwner)
            ball.style.display = 'block'
            // 重置状态
            const cups = document.getElementsByClassName('cup')
            Array.from(cups).forEach(c => {
                c.removeAttribute('style')
            })

            this.cupChangeNum = 0
            this.stopTouch = false

            this.pickUpCup(cup)
            this.timerCount[2] = setTimeout(() => {
                this.backUpCup(cup)
            }, 1000)
            this.timerCount[3] = setTimeout(() => {
                this.startMoveCup()
            }, 2100)
        },
        // 抬起杯子
        pickUpCup(cup) {
            cup.style =
                'animation-name: up;animation-duration: 1s;animation-timing-function: cubic-bezier(0, 0, 0, 0);animation-fill-mode: forwards;'
        },
        // 放下杯子
        backUpCup(cup) {
            cup.style =
                'animation-name: down;animation-duration: 1s;animation-timing-function: cubic-bezier(0, 0, 0, 0);animation-fill-mode: forwards;'
        },
        // 开始移动杯子
        startMoveCup() {
            this.stopTouch = true
            document.getElementById('ball' + this.cupOwner).style.display =
                'none'
            //随机从数组中取两个item
            let randomArr = this.getArrRandomly(this.itemxArray, 2)
            let randomItem1 = randomArr[0]
            let randomItem2 = randomArr[1]
            let randomItem1Index = this.itemxArray.indexOf(randomItem1)
            let randomItem2Index = this.itemxArray.indexOf(randomItem2)

            // 交换两个位置的元素，
            // console.log('准备交换的数组：', this.itemxArray);
            ;[
                this.itemxArray[randomItem1Index],
                this.itemxArray[randomItem2Index]
            ] = [
                this.itemxArray[randomItem2Index],
                this.itemxArray[randomItem1Index]
            ]
            // console.log('交换后的额数组：', this.itemxArray)

            let item1AnmationName = ''
            let item2AnmationName = ''
            let zindex1 = 1002
            let zindex2 = 1002
            if (randomItem1Index == 0 && randomItem2Index == 1) {
                item1AnmationName = 'a'
                item2AnmationName = 'f'
                zindex1 = 1001
                zindex2 = 1003
            } else if (randomItem1Index == 0 && randomItem2Index == 2) {
                item1AnmationName = 'b'
                item2AnmationName = 'e'
                zindex1 = 1001
                zindex2 = 1003
            } else if (randomItem1Index == 1 && randomItem2Index == 2) {
                item1AnmationName = 'c'
                item2AnmationName = 'd'
                zindex1 = 1001
                zindex2 = 1003
            } else if (randomItem1Index == 2 && randomItem2Index == 1) {
                item1AnmationName = 'd'
                item2AnmationName = 'c'
                zindex1 = 1003
                zindex2 = 1001
            } else if (randomItem1Index == 2 && randomItem2Index == 0) {
                item1AnmationName = 'e'
                item2AnmationName = 'b'
                zindex1 = 1003
                zindex2 = 1001
            } else if (randomItem1Index == 1 && randomItem2Index == 0) {
                item1AnmationName = 'f'
                item2AnmationName = 'a'
                zindex1 = 1003
                zindex2 = 1001
            }

            let leftArray = ['10%', '39%', '68%']

            randomItem1.classList.add(item1AnmationName)
            randomItem2.classList.add(item2AnmationName)
            randomItem1.style.zIndex = zindex1
            randomItem2.style.zIndex = zindex2

            let randomItem3 = ''
            for (let i = 0; i < this.itemxArray.length; i++) {
                if (
                    this.itemxArray[i].id != randomItem1.id &&
                    this.itemxArray[i].id != randomItem2.id
                ) {
                    randomItem3 = this.itemxArray[i]
                }
            }
            randomItem3.style.zIndex = 1002

            let that = this
            randomItem2.addEventListener('animationend', setLeft)

            function setLeft() {
                randomItem1.classList.remove(item1AnmationName)
                randomItem2.classList.remove(item2AnmationName)

                randomItem1.style.left = leftArray[randomItem2Index]
                randomItem2.style.left = leftArray[randomItem1Index]

                randomItem2.removeEventListener('animationend', setLeft)

                setTimeout(() => {
                    jugeLoop(that)
                }, 1)
                // jugeLoop(that);

                function jugeLoop(that) {
                    that.cupChangeNum = that.cupChangeNum + 1
                    if (that.cupChangeNum < that.cupChangeMaxNum) {
                        that.startMoveCup()
                    } else {
                        // that.showTips = true
                        // that.tip = that.tips[0]
                        that.stopTouch = false
                    }
                }
            }
        },

        //随机获取数组中的两个不同元素。先打乱数组顺序，再取前两位。
        getArrRandomly(arr, num) {
            let carr = arr.concat()
            var len = carr.length
            for (var i = len - 1; i >= 0; i--) {
                var randomIndex = Math.floor(Math.random() * (i + 1))
                var itemIndex = carr[randomIndex]
                carr[randomIndex] = carr[i]
                carr[i] = itemIndex
            }

            const tmpArr = carr
            let arrList = []
            for (let i = 0; i < num; i++) {
                arrList.push(tmpArr[i])
            }
            return arrList
        },
        //盒子点击触发事件
        touchCup(index) {
            if (!this.stopTouch) {
                const cup = document.getElementById('cup' + index)
                const ball = document.getElementById('ball' + index)
                this.currentUpCup = cup
                this.pickUpCup(cup)
                this.showTips = false
                // 判断是否猜对 || 次数大于2次
                if (index !== this.cupOwner || this.winTimes > 1) {
                    // console.log('很遗憾')
                    this.isOver = true
                    setTimeout(() => {
                        this.showTips = true
                        this.tip = this.tips[1]
                    }, 800)
                } else {
                    ball.style.display = 'block'
                    this.winTimes += 1
                    this.timerCount[6] = setTimeout(() => {
                        this.backUpCup(cup)
                    }, 1000)
                    this.timerCount[7] = setTimeout(() => {
                        this.start()
                    }, 2000)
                }
                this.stopTouch = true
            } else return
        },
        giveUp() {
            this.$router.push('/four')
        }
    },
    beforeDestroy() {
        this.timerCount = []
    }
}
</script>

<style lang="less">
.game-wrapper {
    height: 100%;
    padding: 40px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.game-wrapper,
.box {
    text-align: center;
}
.text-wrapper {
    text-align: left;
    width: 800px;
}
.guess-wrapper {
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
}
.cup-container {
    position: relative;
    height: 100px;
    .box {
        width: 100%;
        height: 100%;
        .box-container {
            position: relative;
            height: 100%;
        }
        .cup {
            cursor: pointer;
            position: absolute;
            transform: translateX(-50%);
            z-index: 99;
            width: 100px;
        }
        .ball {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
        }
    }
}
@media screen and (max-width: 960px) {
    .guess-wrapper {
        max-width: 800px;
        min-width: 100%;
        .cup-container {
            margin: 60px 0;
        }
    }
    .text-wrapper {
        width: 96%;
    }
}
@media screen and (min-width: 960px) {
    .game-wrapper {
        .cup-container {
            margin: 50px 0;
            text-align: center;
        }
        .guess-wrapper {
            margin: 0 18%;
            min-width: 800px;
        }
        .tips-wrapper {
            height: 60px;
            line-height: 60px;
            margin: 10px 5%;
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
            width: 160px;
            height: 50px;
            border-radius: 4px;
            margin-left: 30px;
            margin-right: 30px;
        }
    }
}
#box1 {
    position: absolute;
    width: 22%;
    left: 10%;
}
#box2 {
    position: absolute;
    width: 22%;
    left: 39%;
}
#box3 {
    position: absolute;
    width: 22%;
    left: 68%;
}
.pickUp {
    animation-name: up;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
.pickBack {
    animation-name: down;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
@keyframes up {
    0% {
        top: 0;
    }
    100% {
        top: -60px;
    }
}
@keyframes down {
    0% {
        top: -60px;
    }
    100% {
        top: 0;
    }
}
/* 下面是盒子运动的总共6个路线 */
.a {
    animation-name: ax;
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
@keyframes ax {
    0% {
        left: 10%;
        top: 0px;
    }
    50% {
        top: -80px;
    }
    100% {
        left: 39%;
        top: 0px;
    }
}

.b {
    animation-name: bx;
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
@keyframes bx {
    0% {
        left: 10%;
        top: 0px;
    }
    50% {
        top: -80px;
    }
    100% {
        left: 68%;
        top: 0px;
    }
}

.c {
    animation-name: cx;
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
@keyframes cx {
    0% {
        left: 39%;
        top: 0px;
    }
    50% {
        top: -80px;
    }
    100% {
        left: 68%;
        top: 0px;
    }
}

.d {
    animation-name: dx;
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
@keyframes dx {
    0% {
        left: 68%;
        top: 0px;
    }
    50% {
        top: 80px;
    }
    100% {
        left: 39%;
        top: 0px;
    }
}

.e {
    animation-name: ex;
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
@keyframes ex {
    0% {
        left: 68%;
        top: 0px;
    }
    50% {
        top: 80px;
    }
    100% {
        left: 10%;
        top: 0px;
    }
}

.f {
    animation-name: fx;
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0, 0, 0, 0);
    animation-fill-mode: forwards;
}
@keyframes fx {
    0% {
        left: 39%;
        top: 0px;
    }
    50% {
        top: 80px;
    }
    100% {
        left: 10%;
        top: 0px;
    }
}
</style>