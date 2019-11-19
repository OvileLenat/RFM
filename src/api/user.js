import axios from './index.js'

export const getUserInfo = ({ userId }) => {
  return axios.request({
    url: '/user/getUserInfo',
    method: 'post',
    data: {
      userId
    }
  })
}



export const authorization = () => {
  return axios.request({
    url: '/user/authorization',
    method: 'get'
  })
}

export const register = ({ username, password }) => {
  return axios.request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const login = ({ username, password }) => {
  return axios.request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}



export const changepwd = ({ user_id, currentPwd, newPwd }) => {
  return axios.request({
    url: '/user/changepwd',
    method: 'post',
    data: {
      user_id,
      currentPwd,
      newPwd
    }
  })
}

export const findpwd = ({ email, captcha }) => {
  return axios.request({
    url: '/user/findpwd',
    method: 'post',
    data: {
      email,
      captcha
    }
  })
}

