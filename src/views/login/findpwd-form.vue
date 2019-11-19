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
        <Row type="flex" justify="space-between" class="code-row-bg">
          <Col span="16">
            <i-input v-model="FindForm.passInfo" placeholder="请输入验证码">
              <span slot="prepend">
                <Icon :size="20" type="ios-mail" />
              </span>
            </i-input>
          </Col>
          <Col span="7">
            <Button
              type="primary"
              @click.native.prevent="getPassinfo('FindForm')"
              :class="{disabled: !clickable}"
              long
            >{{Tips}}</Button>
          </Col>
        </Row>
        <!-- <p class="emailTips" v-if="show">验证信息已发送至邮箱，请注意查收！</p> -->
      </FormItem>
      <FormItem prop="password">
        <i-input
          v-model="FindForm.password"
          type="password"
          placeholder="请输入新的密码"
          v-if="!pow_show"
          icon="md-eye"
          @on-click="show_pow"
        >
          <span slot="prepend">
            <icon :size="20" type="md-unlock" />
          </span>
        </i-input>
        <i-input
          v-model="FindForm.password"
          type="text"
          placeholder="请输入新的密码"
          v-if="pow_show"
          icon="md-eye-off"
          @on-click="show_pow"
        >
          <span slot="prepend">
            <icon :size="20" type="md-unlock" />
          </span>
        </i-input>
      </FormItem>
      <FormItem prop="password_again">
        <i-input
          v-model="FindForm.password_again"
          type="password"
          placeholder="请重复输入密码"
          v-if="!pow_proof"
          @on-change="password_proof('FindForm')"
        >
          <span slot="prepend">
            <Icon :size="20" type="md-lock" />
          </span>
        </i-input>
        <i-input
          v-model="FindForm.password_again"
          type="password"
          placeholder="请重复输入密码"
          v-if="pow_proof"
          icon="md-checkmark-circle"
          @on-change="password_proof('FindForm')"
        >
          <span slot="prepend">
            <Icon :size="20" type="md-lock" />
          </span>
        </i-input>
      </FormItem>

      <FormItem>
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
import { getcaptcha, resetpwd } from "@/api/email.js";
export default {
  name: "FindForm-form",
  data() {
    return {
      pow_show: false,
      pow_proof: false,
      // show: false,
      clickable: true,
      time: "60",
      Tips: "获取验证码",
      
      FindForm: {
        email: "",
        passInfo: "",
        password: "",
        password_again: ""
      },
      rule_FindForm: {
        email: [
          {
            required: true,
            validator: Format.FormValidate.Find_pwd().Email,
            trigger: "blur"
          }
        ],
        passInfo: [
          {
            required: true,
            validator: Format.FormValidate.Find_pwd().Captcha,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: Format.FormValidate.Form_ChangePassword().NewPwd,
            trigger: "blur"
          }
        ],
        password_again: [
          {
            required: true,
            validator: Format.FormValidate.Form_ChangePassword().ConfirmNewPwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    show_pow() {
      this.pow_show = !this.pow_show;
    },
    password_proof(name) {
      this.$refs[name].validateField("password_again", error => {
        if (!error) {
          this.pow_proof = !this.pow_proof;
        } else if (this.pow_proof) {
          this.pow_proof = !this.pow_proof;
        } else {
          return;
        }
      });
    },
    getPassinfo(name) {
      if (!this.clickable) {
        return;
      }
      // console.log(this.$refs[name])
      this.$refs[name].validateField("email", error => {
        if (!error) {
          let email = this.FindForm.email;
          getcaptcha(email).then(res => {
            let code = res.data.code;
            let message = res.data.message;
            if (code === 1000) {
              this.$Message.success(message);
              // this.show = true;
              this.$Message.success('验证信息已发送至邮箱，请注意查收！');
              this.clickable = !this.clickable;
              this.Tips = this.time + "s重新发送";
              let clock = window.setInterval(() => {
                this.Tips = this.time-- + "s重新发送";
                if (this.time < 0) {
                  this.clickable = true;
                  this.Tips = "重新发送";
                  this.time = 60;
                  window.clearInterval(clock);
                }
              }, 1000);
            }
            if (code === 1001) {
              this.$Message.error(message);
            }
          });
        }
      });
    },

    find_submit(name) {
      this.$refs[name].validate(isValid => {
        if (isValid) {
          let email = this.FindForm.email;
          let captcha = this.FindForm.passInfo;
          const newPwd = this.FindForm.password;
          // console.log(email,captcha,newPwd);
          resetpwd(email, captcha, newPwd).then(res => {
            // console.log(res);
            let code = res.data.code;
            let message = res.data.message;
            if (code === 1000) {
              this.$Message.success(message);
            }
            if (code === 1001) {
              this.$Message.error(message);
            }
          });
        }
      })
        .then(() => {
          this.$router.push({ name: "pwdsuccess" });
        })
        .catch(err => {
          console.log(err);
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