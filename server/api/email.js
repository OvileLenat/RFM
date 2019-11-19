const mail_config = require('../utils/email')
const models = require('../db/models')
const express = require('express')
const router = express.Router()
const random = require('string-random')
// const time = require('silly-datetime')
const nodemailer = require('nodemailer')
// const smtpTransport = require('nodemailer-smtp-transport')

const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "5678FEWFWEEWGW54W4GW4E65G4E"  // 私钥

// 创建一个SMTP客户端配置
const config = {
  host: mail_config.mail_host, 
  port: mail_config.mail_port,
  // secureConnection: true,
  auth: {
    user: mail_config.mail_user,
    pass: mail_config.mail_pass
  }
}

router.post('/getcaptcha', async(req, res, next) => {
  const mail_recipient = req.body.email
  // 24*60*60*1000
  models.User.findOne({ email: mail_recipient }, (err, user) => {
    if (err) {
      res.json({
        code: 1001,
        message: "发送失败，邮箱数据库查找错误！"
      })
      return
    }
    if (user) { 
    // 创建一个SMTP客户端对象
    const transporter = nodemailer.createTransport(config);
    // console.log(transporter)
    const captcha = random(6, { letters: 'ABCDEFG' });
    const time = new Date();
    const timeExp = time.getTime()*24*60*60*1000;
    const mail = {
        // 发件人
        from: `ThinkBig服务<${ config.auth.user }>`,
        // 主题
        subject: "ThinkBig ID修复",
        // 收件人
        to: mail_recipient,
        html: `<b>亲爱的&nbsp;${ mail_recipient.split("@")[0] }&nbsp;,你好！</b><br/>
        &nbsp;&nbsp;ThinkBig已经收到了你的找回密码请求，验证码: <h3>&nbsp;&nbsp;&nbsp;&nbsp;${ captcha }</h3><br/>
        (此验证码将在1天后失效)<br/><br/>
        ThinkBig<br/>
        ${ time.toLocaleDateString() }<br/>`
      }
      transporter.sendMail(mail, function(err, info){
        if (err) {
          // 554 DT:SPM  被当做垃圾邮件了，邮箱服务发送中断
          res.json({
            code: 1001,
            message: "发送失败，邮件服务错误！"
          })
          return
        }else{
          // console.log(mail_recipient+captcha+time.getTime())
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
      return     
    } else {
      res.json({
        code: 1001,
        message: "发送失败，邮箱未注册！"
      })
      return
    }
  }) 
})

router.post('/resetpwd', async(req, res, next) => {
  const { email, captcha, newPwd } = req.body
  const time = new Date()
  models.User.findOne({ email: email }, (err, user) => {
    if (err){
      res.json({
        code: 1001,
        message: "账号未注册！"
      })
      return
    }
    if (user){
      const found_user = user;
      const username = found_user.username;
      if( captcha === user.captcha ){
        if( time.getTime() < user.captchaExp ){
          models.User.updateOne({ email: email }, { $set: { password: newPwd } }, (err, result) => {
            if(err) {
              res.json({
                code: 1001,
                message: "修改密码失败！"
              })
              return
            } else {
              const payload = {
                username,
                last_loginTimeStamp: Date.parse(new Date())
              }
              let token = jwt.sign(payload, secretOrPrivateKey, {
                mutatePayload: true,
                issuer: "ThinkBig",
                expiresIn: 60 * 60 // 60s
              })
              user.token = token
              models.User(user.save(err => {
                if (err) {
                  res.status(500).json({
                    code: 500,
                    message: '服务器错误，保存失败！'
                  })
                  return
                }
                res.setHeader('token', token)
                res.status(200).json({
                  code: 200,
                  message: "登录成功！",
                  data: {
                    token,
                    found_user
                  }
                })
                return
              }))
            }
          })
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

router.post('/url', async(req, res, next) => {
  res.json({
    code:1000,
    message: "验证成功！"
  })
  return
})

router.post('/changPwdByCaptcha', async (req, res) => {
  const { email, newPwd } = req.body;
})

// 发送邮件
module.exports = router
