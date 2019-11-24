<template>
  <div>
    <Icon type="md-settings" @click="dialogTableVisible = true" />
    <!-- 添加弹框 -->
    <Modal
      title="RFM 权重管理"
      width="60"
      v-model="dialogTableVisible"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :mask-closable="true"
      :mask="true"
      :footerHide="true"
      :styles="{minWidth:'520px'}"
    >
      <Form ref="addFormRef" :rules="rulesAddWeight" :model="addWeightDate" :label-width="82">
        <Row>
          <Col :xs="8" :md="8">
            <FormItem prop="rf" label="R - F：">
              <Input v-model="addWeightDate.rf" @on-focus="focus($event)" @on-change="checkOfCR" />
            </FormItem>
          </Col>
          <Col :xs="8" :md="8">
            <FormItem prop="rm" label="R - M：">
              <Input v-model="addWeightDate.rm" @on-focus="focus($event)" @on-change="checkOfCR" />
            </FormItem>
          </Col>
          <Col :xs="8" :md="8">
            <FormItem prop="fm" label="F - M：">
              <Input v-model="addWeightDate.fm" @on-focus="focus($event)" @on-change="checkOfCR" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="8" :md="8">
            <FormItem prop="cr" label="CR：">
              <Input v-model="addWeightDate.cr" readonly />
            </FormItem>
          </Col>
          <Col :xs="8" :md="9" :lg="10">
            <FormItem prop="name" label="权重名称：">
              <Input v-model="addWeightDate.name" @on-focus="focus($event)" />
            </FormItem>
          </Col>
          <Col :xs="8" :md="7" :lg="6">
            <FormItem>
              <Button type="primary" @click="addWeight('addFormRef')" long>添加</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        width="100%"
        max-height="300"
        size="small"
        border
        :loading="loading"
        :columns="columns"
        :data="weightList"
      ></Table>
    </Modal>
  </div>
</template>
<script>
import { checkoutCR, objDeepCopy } from "@/lib/tools";

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
      if (value > 0.1 || isNaN(value)) {
        callback(new Error("一致性比率CR > 0.1"));
      } else {
        callback();
      }
    };
    const checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else if (value.length > 10) {
        callback(new Error("名称最多为10个字符"));
      } else {
        callback();
      }
    };
    return {
      dialogTableVisible: false,
      addWeightDate: {
        rf: 0,
        rm: 0,
        fm: 0,
        cr: 0,
        name: "",
        weightR: 0,
        weightF: 0,
        weightM: 0
      },
      /**
       * weightList[] 数据库获取
       * id (自增)做数据库增、删唯一标识
       * name 权重名称
       * weightR R值的权重
       * weightF F值的权重
       * weightM M值的权重
       * rf R-F的值
       * rm R-M的值
       * fm F-M的值
       * cr CR的值
       */
      weightList: [
        {
          id: 2,
          name: "电器",
          weightR: 0.45,
          weightF: 0.45,
          weightM: 0.1,
          rf: 3,
          rm: 4,
          fm: 1,
          cr: 0.2131
        }
      ],
      rulesAddWeight: {
        rf: [{ validator: checkRFM, trigger: "blur" }],
        rm: [{ validator: checkRFM, trigger: "blur" }],
        fm: [{ validator: checkRFM, trigger: "blur" }],
        cr: [{ validator: checkCR, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }]
      },
      columns: [
        {
          title: "名称",
          key: "name",
          width: 150,
          fixed: "left",
          sortable: true
        },
        {
          title: "R 权重",
          key: "weightR",
          minWidth: 75,
          sortable: true
        },
        {
          title: "F 权重",
          key: "weightF",
          minWidth: 75,
          sortable: true
        },
        {
          title: "M 权重",
          key: "weightM",
          minWidth: 75,
          sortable: true
        },
        {
          title: "编辑",
          key: "action",
          fixed: "right",
          width: 125,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    /**
     * 表单功能：输入框获得焦点时选中文本
     */
    focus(event) {
      event.currentTarget.select();
    },
    /**
     * 表单功能：对表单CR值进行检验
     */
    checkOfCR() {
      let arr = checkoutCR(
        parseFloat(this.addWeightDate.rf),
        parseFloat(this.addWeightDate.rm),
        parseFloat(this.addWeightDate.fm)
      );
      this.addWeightDate.cr = arr[0].toFixed(6);
      this.addWeightDate.weightR = arr[1].toFixed(2);
      this.addWeightDate.weightF = arr[2].toFixed(2);
      this.addWeightDate.weightM = arr[3].toFixed(2);
      this.$refs.addFormRef.validateField("cr");
    },
    /**
     * 表单功能：添加新配置权重
     * 未完成：数据库增添
     */
    addWeight(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let newWeight = objDeepCopy(this.addWeightDate);
          // 另一种深度复制方法
          // let newWeight = JSON.parse(JSON.stringify(this.addWeightDate));
          // 数据库insert，id自增
          this.weightList.unshift(newWeight);
          this.$Message.success("添加成功");
          this.$refs[name].resetFields();
        } else {
          this.$Message.error("添加失败");
        }
      });
    },
    /**
     * 表格功能：查看某配置权重详细信息(RF RM FM CR 值)
     */
    show(index) {
      this.$Modal.info({
        title: this.weightList[index].name,
        content: `R-F：${this.weightList[index].rf}&nbsp&nbsp&nbsp&nbsp
                    R-M：${this.weightList[index].rm}&nbsp&nbsp&nbsp&nbsp
                    F-M：${this.weightList[index].fm}<br>
                    C R：${this.weightList[index].cr}`
      });
    },
    /**
     * 表格功能：对某配置权重进行移除
     * 未完成：数据库删减
     */
    remove(index) {
      // 根据id对数据库进行操作
      this.weightList.splice(index, 1);
    }
  }
};
</script>