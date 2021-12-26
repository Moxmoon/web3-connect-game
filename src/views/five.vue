<template>
  <div class="wrapper">
    <!-- Welcome to Ethanim -->
    <transition name="fade">
      <div v-show="show1"
           class="logo"></div>
    </transition>
    <!-- logo -->
    <transition name="fade">
      <h2 v-show="show2">Welcome to Ethanim</h2>
    </transition>
    <!-- Copyright -->
    <transition name="fade">
      <p v-show="show2">Copyright <img :src="require('@/assets/images/copyright.png')"
             alt=""
             width="10"> 2022，Ethanim Corp.</p>
    </transition>
    <transition name="fade">
      <p v-show="show2"
         style="margin:0;">All rights reserved</p>
    </transition>
    <transition name="fade">
      <div class="footer"
           v-show="show3">
        <div class="btn-group">
          <!-- <div class="input-wrapper item">
            <input placeholder="Receive email updates"></input>
            <div class="button"
                 @click="subscribe">Subscribe</div>
          </div> -->
          <mailchimp></mailchimp>
          <div class="button"
               @click="jumpLink">
            Whitepaper >
          </div>
        </div>
        <div class="concat-link">
          <a v-for="(item,index) in links"
             :key="index"
             :href="item.link"
             :target="item.name==='email'?null:'_blank'"
             :class="[item.name,'link']">
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Mailchimp from '../components/Mailchimp.vue'
export default {
    components: { Mailchimp },
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            wait: 800,
            emailContent: '',
            links: [
                {
                    name: 'twitter',
                    link: 'https://twitter.com/Ethanim_Network'
                },
                {
                    name: 'email',
                    link: 'mailto:contact@ethanim.network'
                },
                {
                    name: 'discord',
                    link: 'https://discord.gg/Uzkat3zarz'
                },
                {
                    name: 'telegram',
                    link: 'https://t.me/Ethanim_Network'
                }
            ],
            jaLink: 'https://ethanim.gitbook.io/ethanimhowaitopp',
            enLink: 'https://ethanim.gitbook.io/whitepaper/'
        }
    },
    mounted() {
        this.fadeIn()
    },
    methods: {
        fadeIn() {
            this.show1 = true
            setTimeout(() => {
                this.show2 = true
            }, this.wait)
            setTimeout(() => {
                this.show3 = true
            }, this.wait * 2)
        },
        jumpLink() {
            let currentLang = navigator.language //判断除IE外其他浏览器使用语言
            if (!currentLang) {
                //判断IE浏览器使用语言
                currentLang = navigator.browserLanguage
            }
            window.open(currentLang === 'ja' ? this.jaLink : this.enLink)
        }
    }
}
</script>

<style lang="less" scoped>
.logo {
    width: 100%;
    height: 120px;
    margin-bottom: 80px;
    flex-shrink: 0;
    background: url('../assets/images/logo@2x.png') no-repeat center;
}
.btn-group {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.concat-link {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    .link {
        width: 120px;
        height: 120px;
    }
    .twitter {
        background: url('../assets/images/twitter.png') no-repeat center;
    }
    .discord {
        background: url('../assets/images/discord.png') no-repeat center;
    }
    .email {
        background: url('../assets/images/email.png') no-repeat center;
    }
    .telegram {
        background: url('../assets/images/telegram.png') no-repeat center;
    }
}
.footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
    margin-top: 50px;
    margin-bottom: 50px;
}
@media screen and (min-width: 750px) {
    .button {
        font-size: 16px;
        line-height: 50px;
        width: 180px;
        height: 50px;
        border-radius: 4px;
    }
    .btn-group {
        .input-wrapper {
            input {
                height: 50px;
            }
        }
    }
    .concat-link {
        max-width: 500px;
    }
}
@media screen and (min-width: 750px) and (max-width: 960px) {
    .btn-group {
        display: flex;
        flex-direction: row;
    }
}
@media screen and (max-width: 750px) {
    h2 {
        font-size: 56px;
    }
    .logo {
        width: 100%;
        height: 120px;
        margin-bottom: 80px;
        background: url('../assets/images/logo.png') no-repeat center;
    }
    .footer {
        .btn-group {
            // .input-wrapper {
            //     margin-right: 0px;
            //     input {
            //         font-size: 26px;
            //     }
            // }
            // .item {
            //     width: 80%;
            // }
            .button {
                width: 532px;
            }
        }
        .concat-link {
            margin: 100px 10% 20px 10%;
            .link {
                width: 80px;
                height: 80px;
            }
        }
    }
}
</style>