import axios from './index'

export const validationGetUrl = (email) => {
  return axios.request({
    url: '/email_a/validationGetUrl',
    method: 'post',
    data: {
      email
    }
  })
}

export const validationByUrl = () => {
  return axios.request({
    url: '/email_a/validationByUrl',
    method: 'get'
  })
}

export const getcaptcha = (email) => {
  return axios.request({
    url: '/email/getcaptcha',
    method: 'post',
    data: {
      email
    }
  })
}

export const resetpwd = (email, captcha, newPwd) => {
  return axios.request({
    url: '/email/resetpwd',
    method: 'post',
    data: {
      email,
      captcha,
      newPwd
    }
  })
}