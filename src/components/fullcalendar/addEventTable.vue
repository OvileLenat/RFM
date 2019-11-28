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
    <Form ref="newEvent" :model="newEvent" :rules="ruleValidate" :label-width="80">
      <FormItem label="事务标题">
        <Input v-model="newEvent.title" placeholder="请输入事务的标题" />
      </FormItem>
      <FormItem label="事务内容">
        <Input
          v-model="newEvent.extendedProps.description"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请输入详细的事务内容"
        />
      </FormItem>
      <FormItem label="事务类型">
        <Select v-model="newEvent.color" placeholder="请选择事务的类型" style="width: 200px">
          <Option
            v-for="(item,index) in transactionTypes"
            :label="item.label"
            :value="item.value"
            :key="index"
          >
            <span style="margin-right:10px">
              <Icon type="md-radio-button-off" :color="item.value" />
            </span>
            <span>{{ item.label }}</span>
          </Option>
        </Select>
      </FormItem>
      <FormItem label="时间" v-show="!timeState.isRecurring">
        <DatePicker
          type="datetimerange"
          v-show="!timeState.isAllday"
          :value="[newEvent.start,newEvent.end]"
          format="yyyy-MM-dd HH:mm"
          placement="top-end"
          placeholder="请选择具体时间"
          style="width: 300px"
          @on-change="changTime"
        ></DatePicker>
        <DatePicker
          type="daterange"
          v-show="timeState.isAllday"
          :value="[newEvent.start,newEvent.end]"
          format="yyyy-MM-dd"
          placement="top-end"
          placeholder="请选择时间"
          style="width: 200px"
          @on-change="changTime"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="timeType" @on-change="changeMoreChoices">
          <Radio label="默认"></Radio>
          <Radio label="全天"></Radio>
          <Radio label="周期性"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="重复类型：" v-show="timeState.isRecurring">
        <Select v-model="recurringType" style="width:200px" @on-change="changedRecurringType">
          <Option
            v-for="item in recurringTypes"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="重复时间：" v-show="timeState.isRecurring">
        <Select
          multiple
          :value="newEvent.daysOfWeek"
          style="width:210px"
          v-show="recurringState.isWeekDay"
        >
          <Option v-for="item in weekLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <TimePicker
          format="HH:mm"
          v-show="recurringState.isEveryDay || recurringState.isWeekDay"
          type="timerange"
          placement="bottom-end"
          placeholder="Select time"
          style="width: 168px"
          @on-change="changRecurringTime"
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
      times: [],
      startTime: "",
      endTime: "",
      timeType: "默认",
      timeState: {
        // 默认 全天 周期性
        isAllday: false,
        isRecurring: false
      },
      recurringState: {
        // 每天 指定星期
        isEveryDay: false,
        isWeekDay: false
      },
      recurringType: 1,
      transactionType: "",
      // 比较重要：后台消息提醒；特别重要：邮件和后台消息提醒。
      transactionTypes: [
        { value: "#2db7f5", label: "不重要" },
        { value: "#19be6b", label: "一般重要" },
        { value: "#ff9900", label: "比较重要" },
        { value: "#ed4014", label: "特别重要" }
      ],
      // 更多周期性事件可以使用RRule插件(https://fullcalendar.io/docs/rrule-plugin)
      recurringTypes: [
        { value: 1, label: "每天" },
        { value: 2, label: "指定星期" }
      ],
      weekLists: [
        { value: 1, label: "周一" },
        { value: 2, label: "周二" },
        { value: 3, label: "周三" },
        { value: 4, label: "周四" },
        { value: 5, label: "周五" },
        { value: 6, label: "周六" },
        { value: 0, label: "周日" }
      ],
      modal1: true,
      newEvent: {
        title: "",
        extendedProps:{
          description: ""
        },
        start: "",
        end: "",
        allDay: false,
        color: "",
        daysOfWeek: [],
        startTime: "",
        endTime: ""
      },
      ruleValidate: {
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
    this.changedRecurringType();
  },
  methods: {
    changRecurringTime(time) {
      this.newEvent.startTime = time[0];
      this.newEvent.endTime = time[1];
      console.log(this.newEvent);
    },
    changTime(time) {
      this.newEvent.start = time[0];
      this.newEvent.end = time[1];
      console.log(this.newEvent);
    },
    changeMoreChoices(name) {
      this.$Message.success(name);
      console.log(this.newEvent);
      if (name === "默认") {
        this.timeState.isAllday = false;
        this.timeState.isRecurring = false;
        this.newEvent.allDay = false;
        this.newEvent.start += " 00:00";
        this.newEvent.end += " 00:00";
      }
      if (name === "全天") {
        this.timeState.isAllday = true;
        this.timeState.isRecurring = false;
        this.newEvent.allDay = true;
      }
      if (name === "周期性") {
        this.timeState.isAllday = false;
        this.timeState.isRecurring = true;
        this.newEvent.allDay = false;
      }
    },
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
    initRecurring() {
      this.recurringState.isWeekDay = false;
      this.recurringState.isEveryDay = false;
    },

    addEvent() {},
    changedRecurringType() {
      this.$Message.success(this.recurringType);
      switch (this.recurringType) {
        case 1:
          this.initRecurring();
          this.recurringState.isEveryDay = true;
          break;
        case 2:
          this.initRecurring();
          this.recurringState.isWeekDay = true;
          break;
        default:
          this.initRecurring();
          break;
      }
    }
  }
};
</script>
