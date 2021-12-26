<template>
  <div id="mc_embed_signup">
    <form action="https://network.us20.list-manage.com/subscribe/post?u=f8f45ab3bc061229666d00320&amp;id=d572bbdb76"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          novalidate
          @submit.prevent="submitForm">
      <div id="mc_embed_signup_scroll">
        <div class="mc-field-group">
          <input type="email"
                 value=""
                 name="EMAIL"
                 class="required email"
                 id="mce-EMAIL"
                 placeholder="Receive email updates">
        </div>
        <div id="mce-responses"
             class="clear foot">
          <div class="response"
               id="mce-error-response"
               style="display:none"></div>
          <div class="response"
               id="mce-success-response"
               style="display:none"></div>
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;"
             aria-hidden="true"><input type="text"
                 name="b_f8f45ab3bc061229666d00320_d572bbdb76"
                 tabindex="-1"
                 value=""></div>
        <div class="optionalParent">
          <div class="clear foot">
            <input type="submit"
                   value="Subscribe"
                   name="subscribe"
                   id="mc-embedded-subscribe"
                   class="button"
                   placeholder="Receive">
            <p class="brandingLogo"><a href="http://eepurl.com/hQL1gz"
                 title="Mailchimp - email marketing made easy and fun"></a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import { isEmail } from '@/utils/utils'
export default {
    methods: {
        submitForm() {
            const input = document.getElementById('mce-EMAIL')
            if (!input.value) return
            if (!isEmail(input.value)) {
                input.value = ''
                input.setAttribute('placeholder', 'wrong email format!')
                return
            }
            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/mailchimp/post?u=f8f45ab3bc061229666d00320&amp;id=d572bbdb76',
                method: 'post',
                data: `EMAIL=${input.value} `
            })
                .then(res => {
                    if (res.status === 200) {
                        input.value = ''
                        input.setAttribute(
                            'placeholder',
                            'subscribed successfully!'
                        )
                    }
                })
                .catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
#mc_embed_signup_scroll {
    display: flex;
    flex-wrap: nowrap;
    margin-right: 60px;
    flex: 1;
    .mc-field-group {
        input {
            height: 88px;
            line-height: 88px;
            font-size: 18px;
            background-color: #000;
            border: 1px solid #fff;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            border-right: none;
            color: #fff;
            flex: 1;
            white-space: nowrap;
            padding: 0 20px;
            text-align: left;
            font-family: Perfect;
            margin-right: -5px;
            margin-top: 1rem;
            input:-internal-autofill-selected {
                -webkit-text-fill-color: #000 !important;
                transition: background-color 5000s ease-in-out 0s !important;
            }
        }
    }
    .button {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-left: none;
        font-family: Perfect;
        height: auto;
        padding: 0 10px 0 15px;
    }
}
p {
    margin-block-start: 0;
    margin-block-end: 0;
}
@media screen and (min-width: 750px) {
    .button {
        font-size: 16px;
        line-height: 50px;
        width: 180px;
        height: 50px;
        border-radius: 4px;
    }
    #mc_embed_signup_scroll {
        .mc-field-group {
            input {
                width: 300px;
                height: 50px;
            }
        }
    }
}
@media screen and (max-width: 750px) {
    #mc_embed_signup_scroll {
        margin-right: 0px;
        .mc-field-group {
            input {
                font-size: 26px;
            }
        }
    }
    #mc-embedded-subscribe {
        width: 200px;
    }
}
</style>

