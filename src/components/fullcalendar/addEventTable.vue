<template>
  <Modal
    v-model="modal1"
    title="添加事务"
    :mask-closable="false"
    :draggable="true"
    :footer-hide="true"
    :scrollable="true"
    @on-ok="addEvent"
    @on-cancel="cancelAddEvent"
  >
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="事务标题" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="事务内容" prop="mail">
        <Input
          v-model="formValidate.desc"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem label="事务类型" prop="city">
        <Select v-model="formValidate.city" placeholder="Select your city">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="开始时间">
        <DatePicker
          type="date"
          v-model="startTime"
          placeholder="请输入时间"
          style="width: 200px"
          v-show="isAllday"
        ></DatePicker>
        <DatePicker
          type="datetime"
          v-model="startTime"
          format="yyyy-MM-dd HH:mm"
          v-show="!isAllday"
          placeholder="请输入具体时间"
          style="width: 200px"
        ></DatePicker>
      </FormItem>
      <FormItem label="结束时间">
        <DatePicker
          type="date"
          v-model="endTime"
          placeholder="请输入时间"
          style="width: 200px"
          v-show="isAllday"
        ></DatePicker>
        <DatePicker
          type="datetime"
          v-model="endTime"
          format="yyyy-MM-dd HH:mm"
          v-show="!isAllday"
          placeholder="请输入具体时间"
          style="width: 200px"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Checkbox v-model="isAllday">全天</Checkbox>
        <Checkbox v-model="isRepeat">重复</Checkbox>
      </FormItem>
      <FormItem label="重复类型：" prop="repeattype" v-show="isRepeat">
        <Select v-model="repeatType" style="width:200px" @on-change="changedRepeatType">
          <Option v-for="item in repeatTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="重复时间：" prop="repeattime" v-show="isRepeat">
        
        <TimePicker
          format="HH:mm"
          v-show="isRepeatDay"
          type="timerange"
          placement="bottom-end"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </FormItem>

      <FormItem>
        <Button @click="handleReset('formValidate')">取消</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">添加</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      isAllday: false,
      isRepeat: false,
      isRepeatDay: false,
      repeatType: "1",
      repeatTypes: [
        {
          value: "1",
          label: "按天重复"
        },
        {
          value: "2",
          label: "按周重复"
        },
        {
          value: "3",
          label: "按月重复"
        },
        {
          value: "4",
          label: "按年重复"
        },
        {
          value: "5",
          label: "按工作日重复"
        }
      ],
      modal1: true,
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.changedRepeatType()
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    cancelAddEvent() {},
    addEvent() {},
    changedRepeatType() {
      switch (parseInt(this.repeatType)) {
        case 1:
        case 5:
          this.isRepeatDay = true;
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
       
        default:
          break;
      }
    }
  }
};
</script>
