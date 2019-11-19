const mail_config = require('../utils/email')
const models = require('../db/models')
const express = require('express')
const router = express.Router()
const random = require('string-random')
// const time = require('silly-datetime')
const nodemailer = require('nodemailer')

// 创建一个SMTP客户端配置
const config = {
  host: mail_config.mail_host, 
  port: mail_config.mail_port,
  auth: {
    user: mail_config.mail_user,
    pass: mail_config.mail_pass
  }
}

router.get('/validationByUrl', async(req, res, next) => {
  // fileName = __filename.split("\\")
  const email = req.param('email');
  const captcha = req.param('captcha');
  const time = new Date();
  models.User.findOne({ email: email }, (err, user) => {
    if (err){
      res.json({
        code: 1001,
        message: "验证失败，未知错误！"
      })
      return
    }
    if (user){
      if( captcha === user.captcha ){
        if( time.getTime() < user.captchaExp ){
          res.json({
            code: 1000,
            message: "验证成功！"
          })
          return
        } else {
          res.json({
            code: 1001,
            message: "验证码过期！"
          })
          return
        }
      }else{
        res.json({
          code: 1001,
          message: "验证失败，验证码错误！"
        })
        return
      }
    }else{
      res.json({
        code: 1001,
        message: "验证失败，邮箱未注册！"
      })
      return
    }
  })
})

router.post('/validationGetUrl', async(req, res, next) => {
  console.log(req.headers);
  const mail_recipient = req.body.email;
  // 此路径可能有 Bug
  const fileName = (__filename.split("\\")[__filename.split("\\").length-1]).split(".")[0];
  const base_url = req.headers['x-forwarded-host'];
  console.log(base_url);
  models.User.findOne({ email: mail_recipient }, (err, user) => {
    if (err) {
      res.json({
        code: 1001,
        message: "发送失败，未知错误！"
      })
      return;
    }
    if (user) { 
    // 创建一个SMTP客户端对象
      const transporter = nodemailer.createTransport(config);
      const RetrievePassword = random(64, {specials:false});
      const time = new Date();
      const timeExp = time.getTime()*24*60*60*1000;
      const mail = {
        // 发件人
        from: `ThinkBig服务<${ config.auth.user }>`,
        // 主题
        subject: 'ThinkBig ID修复',
        // 收件人
        to: mail_recipient,
        html: `<b>亲爱的&nbsp;${ mail_recipient.split("@")[0] }&nbsp;,你好！</b><br/>
        &nbsp;&nbsp;ThinkBig已经收到了你的找回密码请求，请点击&nbsp; <a href="http://${base_url}/${fileName}/validationByUrl?email=${mail_recipient}&captcha=${RetrievePassword}">此链接重置密码</a>&nbsp;。<br/><br/>
        如果以上链接无法访问，请将以下网址复制并粘贴至新的浏览器窗口中。<br/>
        <h3>${base_url}/${fileName}/validationByUrl?email=${mail_recipient}&captcha=${RetrievePassword}</h3><br/>
        (此验证码将在1天后失效)<br/><br/>
        ThinkBig<br/>
        ${ time.toLocaleDateString() }<br/>`
      }
      transporter.sendMail(mail, function(error, info){
        if(error) {
          // console.log(error);
          // 554 DT:SPM  被当做垃圾邮件了，邮箱服务发送中断
          res.json({
            code: 1001,
            message: "发送失败，邮件服务错误！"
          })
          return
        }else{
          models.User.updateOne({ email: mail_recipient }, { $set: { captcha: captcha, captchaExp: timeExp } }, (err, result) => {
            if (err) {
              res.json({
                code: 1001,
                message: "发送失败，验证码保存错误！"
              })
              return
            }else{
              res.json({
                code: 1000,
                message: "发送成功！"
              })
              console.log('mail sent:', info.response, 'to:', mail_recipient)
              return
            }
          })
        }
      })
      return;
    } else {
      res.json({
        code: 1001,
        message: "发送失败，邮箱未注册！"
      })
      return;
    }
  })
})

// 发送邮件
module.exports = router
