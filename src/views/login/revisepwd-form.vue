<template>
  <div icon="log-in" :bordered="false" :dis-hover="true" class="card-style">
    <div class="logo">
      <img class="logo-img" src="../../assets/images/TBDS.png" />
    </div>
    <div class="card-head"></div>
    <div class="find-circle-head"></div>
    <Form
      ref="FindForm"
      :model="FindForm"
      :rules="rule_FindForm"
      class="form-class"
      @keydown.enter.native="find_submit('FindForm')"
    >
      <FormItem prop="email">
        <i-input v-model="FindForm.email" placeholder="请输入注册邮箱">
          <span slot="prepend">
            <Icon :size="20" type="md-at" />
          </span>
        </i-input>
      </FormItem>
      <FormItem prop="passInfo">
        <i-input v-model="FindForm.passInfo" placeholder="请输入验证码">
          <span slot="prepend">
            <Icon :size="20" type="ios-mail" />
          </span>
        </i-input>
        <p class="emailTips" v-if="show">验证信息已发送至邮箱，请注意查收！</p>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          @click.native.prevent="getPassinfo('FindForm')"
          :class="{disabled: !clickable}"
          long
        >{{Tips}}</Button>
        <Button
          class="submit"
          type="primary"
          @click.native.prevent="find_submit('FindForm')"
          long
        >提交验证</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Format from "@/assets/js/Format.js";
import { mapMutations, mapActions } from "vuex";
import "./RegLogin.less";
import { getcaptcha,resetpwd } from "@/api/email.js";
export default {
  name: "FindForm-form",
  data() {
    return {
      show: false,
      clickable: true,
      time: "60",
      Tips: "获取验证信息",
      FindForm: {
        email: "",
        passInfo: ""
      },
      rule_FindForm: {
        email: [
          {
            required: true,
            validator: Format.FormValidate.Find_pwd().Email,
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    getPassinfo(name) {
      if (!this.clickable) {
        return;
      }
      // console.log(this.$refs[name])
      this.$refs[name].validate(isValid => {
        if (isValid) {
          let email = this.FindForm.email
          getcaptcha(email).then(res => {
            let code = res.data.code
            let message = res.data.message
            if (code === 1000) {
              this.$Message.success(message)
              this.show = true
              this.clickable = !this.clickable
              this.Tips = this.time + "s后重新发送"
              let clock = window.setInterval(() => {
                this.Tips = (this.time--) + "s后重新发送"
                if (this.time < 0) {
                  this.clickable = true
                  this.Tips = "重新发送验证信息"
                  this.time = 60
                  window.clearInterval(clock)
                }
              }, 1000)
            } 
            if (code === 1001) {
              this.$Message.error(message)
            }
          });
        }
      });
    },
    
    find_submit(name) {
      this.$refs[name].validate(isValid => {
        if (isValid) {
          let email = this.FindForm.email
          let captcha = this.FindForm.passInfo
          resetpwd(email,captcha).then(res => {
            let code = res.data.code
            let message = res.data.message
            if (code === 1000) {
              this.$Message.success(message)
              
            }
            if (code === 1001) {
              this.$Message.error(message)
            }
          });
        }
      });
    },
    mounted() {
      window.addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          this.find_submit("FindForm");
        }
      });
    }
  }
};
</script>