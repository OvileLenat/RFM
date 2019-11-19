<template>
  <div>
    正在验证中...
  </div>
</template>

<script>
import { validationByUrl } from '@/api/email'

export default {
  props: {
    email: { type: String },
    captcha: { type: String }
  },
  created() {
    validationByUrl(this.captcha).then(res => {
      console.log(res.data)
    })
  }
}
</script>