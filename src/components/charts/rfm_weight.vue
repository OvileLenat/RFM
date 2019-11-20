<template>
  <div>
    <Icon type="ios-add-circle-outline" @click="dialogTableVisible = true" />
    <!-- 添加用户弹框 -->
    <Modal
      title="添加用户"
       @on-ok="ok"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      draggable 
      width=50
    >
    
      <!-- 添加用户的表单 -->
      <Form ref="addFormRef" :rules="rulesAddWeight" :model="addWeight" label-width="100">
        
        <Row>
          <Col span="8">
        <FormItem  prop="rf" label="R - F：">
          <Input v-model="addWeight.rf" />
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem prop="rm" label="R - M：">
          <Input v-model="addWeight.rm" />
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem prop="fm" label="F - M：">
          <Input v-model="addWeight.fm" />
        </FormItem>
        </Col>
        </Row>
       
        <FormItem prop="cr" label="CR：">
          <Input v-model="addUser.cr" />
        </FormItem>
        <FormItem>
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="onAddUser">确定</el-button>
        </FormItem>
      </el-form>
    </Modal>
  </div>
</template>
<script>

export default {
   data() {
    const checkRFM = (rule, value, callback) => {
      if(value <= 0){
        callback(new Error('请输入的值 > 0'));
      } else {
        callback();
      }
    };
    const checkCR = (rule, value, callback) => {
      if(value < 0.1){
        callback(new Error('一致性比率CR > 0.1'));
      } else {
        callback();
      }
    };
    return {
      dialogTableVisible: false, // 添加用户弹框
      // 添加用户
      addWeight: {
        rf: 0,
        rm: 0,
        fm: 0,
        cr: 0
      },
      rulesAddWeight: {
        rf: [
          { validator: checkRFM, trigger: 'blur' }
        ],
        rm: [
          { validator: checkRFM, trigger: 'blur' }
        ],
        fm: [
          { validator: checkRFM, trigger: 'blur' }
        ],
        cr: [
          { validator: checkCR, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>