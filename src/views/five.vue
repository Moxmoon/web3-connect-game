<template>
  <div class="wrapper">
    <!-- logo -->
    <transition name="fade">
      <div v-show="show1"
           class="logo"></div>
    </transition>
    <div>
      <!-- Welcome to Ethanim -->
      <transition name="fade">
        <h2 v-show="show2"
            style="margin-bottom: 18px;">Welcome to Ethanim</h2>
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
    </div>
    <transition name="fade">
      <div class="footer"
           v-show="show3">
        <div class="btn-group">
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
        window.onresize()
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
            let currentLang = navigator.language
            if (!currentLang) {
                currentLang = navigator.browserLanguage
            }
            window.open(currentLang === 'ja' ? this.jaLink : this.enLink)
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    padding: 6.19rem 3.13rem;
}
.logo {
    width: 100%;
    height: 8.38rem;
    margin-bottom: 6.88rem;
    flex-shrink: 0;
    background: url('../assets/images/logo@2x.png') no-repeat center;
}
.btn-group {
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
    margin-top: 3.31rem;
    .link {
        width: 80px;
        height: 80px;
        &:not(:last-child) {
            margin-right: 3.13rem;
        }
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
    justify-content: center;
    flex: 1;
}
@media screen and (max-width: 749px) {
    .wrapper {
        padding-top: 9.5rem;
    }
    .logo {
        margin-bottom: 1.69rem;
        background: url('../assets/images/logo.png') no-repeat center;
    }
    .btn-group {
        width: 100%;
        .button {
            width: 78%;
        }
    }
}
</style>