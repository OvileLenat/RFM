<template>
  <div>
    <Icon type="ios-add-circle-outline" @click="dialogTableVisible = true" />
    <!-- 添加弹框 -->
    <Modal
      title="添加 RFM 权重"
      v-model="dialogTableVisible"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :mask-closable="true"
      :mask="true"
      width="20"
      :styles="{minWidth:'240px'}"
      okText="添加"
      footer-hide="true"
    >
      <Form ref="addFormRef" :rules="rulesAddWeight" :model="addWeight" minWidth="240">
        <Row>
          <Col span="8">
            <FormItem prop="rf" label="R - F：">
              <Input v-model="addWeight.rf" @on-change="checkOutCR" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem prop="rm" label="R - M：">
              <Input v-model="addWeight.rm" @on-change="checkOutCR" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem prop="fm" label="F - M：">
              <Input v-model="addWeight.fm" @on-change="checkOutCR" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem prop="cr" label="CR：">
            <Col span="15">
              <Input v-model="addWeight.cr" readonly />
            </Col>
            <Col span="4">
              <Button :size="small" type="button">添加</Button>
            </Col>
          </FormItem>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { checkoutCR } from "@/lib/tools";

export default {
  data() {
    const checkRFM = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error("请输入的值 > 0"));
      } else {
        callback();
      }
    };
    const checkCR = (rule, value, callback) => {
      console.log("CR is " + typeof value);
      console.log("CR = " + value);
      if (value > 0.1 || isNaN(value)) {
        callback(new Error("一致性比率CR > 0.1"));
      } else {
        callback();
      }
    };
    return {
      dialogTableVisible: false,
      addWeight: {
        rf: 0,
        rm: 0,
        fm: 0,
        cr: 0
      },
      rulesAddWeight: {
        rf: [{ validator: checkRFM, trigger: "blur" }],
        rm: [{ validator: checkRFM, trigger: "blur" }],
        fm: [{ validator: checkRFM, trigger: "blur" }],
        cr: [{ validator: checkCR, trigger: "blur" }]
      }
    };
  },
  methods: {
    checkOutCR() {
      console.log("checkOutCR be checked");
      let arr = checkoutCR(
        parseFloat(this.addWeight.rf),
        parseFloat(this.addWeight.rm),
        parseFloat(this.addWeight.fm)
      );
      this.addWeight.cr = arr[0];
      // 检验 CR 值
      this.$refs.addFormRef.validateField("cr");
    }
  }
};
</script>