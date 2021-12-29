<template>
  <div class="subscribe">
    <div id="mc_embed_signup">
      <form action="https://network.us20.list-manage.com/subscribe/post-json?u=f8f45ab3bc061229666d00320&amp;id=d572bbdb76&amp;c=?"
            method="get"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            style="display:none"
            novalidate>
        <div id="mc_embed_signup_scroll">
          <h2>Subscribe</h2>
          <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
          <div class="mc-field-group">
            <label for="mce-EMAIL">Email Address <span class="asterisk">*</span>
            </label>
            <input type="email"
                   value=""
                   name="EMAIL"
                   class="required email"
                   id="mce-EMAIL">
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
               aria-hidden="true">
            <input type="text"
                   name="b_f8f45ab3bc061229666d00320_d572bbdb76"
                   tabindex="-1"
                   value="">
          </div>
          <div class="optionalParent">
            <div class="clear foot">
              <input type="submit"
                     value="Subscribe"
                     name="subscribe"
                     id="mc-embedded-subscribe"
                     class="button">
              <p class="brandingLogo">
                <a href="http://eepurl.com/hQL1gz"
                   title="Mailchimp - email marketing made easy and fun">
                  <img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg">
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="input-wrapper">
      <input type="text"
             name="EMAIL"
             id="email"
             placeholder="Receive email updates">
      <div class="button"
           @click.prevent="subscribe">Subscribe</div>
    </div>
  </div>
</template>
<script>
export default {
    methods: {
        subscribe() {
            const $form = $('#mc-embedded-subscribe-form')
            const value = $('#email').val()
            $('#mce-EMAIL').val(value)
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                cache: false,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                error: function (err) {
                    alert('err')
                },
                success: function (data) {
                    $('#email').val('')
                    console.log(data.msg)
                    if (data.result != 'success') {
                        $('#email').attr('placeholder', 'Subscribed failed')
                        // 表单提交失败...
                    } else {
                        $('#email').attr(
                            'placeholder',
                            'Subscribed successfully!'
                        )
                        // 表单提交成功...
                    }
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.subscribe {
    .input-wrapper {
        display: flex;
        flex-wrap: nowrap;
        input {
            height: 4.88rem;
            font-size: 1.2rem;
            line-height: 4.88rem;
            border: 0.06rem solid #ffffff;
            background-color: #000;
            border-top-left-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            border-right: none;
            color: #fff;
            flex: 1;
            white-space: nowrap;
            padding: 0 1.6rem;
            text-align: left;
            font-family: Perfect;
            margin-right: -5px;
            margin-top: 1.4rem;
            width: 24.8rem;
            &:focus-visible {
                outline: none;
            }
        }
        .button {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
            border-left: none;
            font-family: Perfect;
            height: auto;
        }
    }
}

p {
    margin-block-start: 0;
    margin-block-end: 0;
}
@media screen and (min-width: 750px) {
    .input-wrapper {
        margin-right: 6.55rem;
    }
}
@media screen and (max-width: 749px) {
    .subscribe {
        width: 78%;
        .input-wrapper {
            width: 100%;
            input {
                width: 16rem;
            }
        }
    }
}
</style>

