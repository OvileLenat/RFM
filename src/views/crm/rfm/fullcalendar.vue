<template>
  <div>
    <FullCalendar
      :plugins="calendarPlugins"
      height="parent"
      :allDaySlot="true"
      allDayText="全天"
      :customButtons="{
      newWork:{
        text:'新增',
        click:function(){
          modal1 = true
        }}}"
      :header="{
      left: 'prev,next today newWork',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :buttonText="buttonText"
      :slotEventOverlap="true"
      :events="Events"
      :eventLimit="true"
      eventLimitText = "更多"
      :dayPopoverFormat="{ 
      month: '2-digit',
      day: '2-digit',
      year: 'numeric' 
      }"
      :views="{
      timeGrid: {
        eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
      }
      }"
      :unselect-auto="false"
      :select-overlap="false"
      :business-hours="{
      startTime: '07:00',
      endTime:'18:00',
      daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0 ]
      }"
      d
      :select-allow="handlerSeelctAllow"
      select-mirror="true"
      minTime="07:00:00"
      maxTime="23:00:00"
      selectable="true"
      slotDuration="00:30"
      slot-label-format="HH:mm"
      title-format="YYYY年MM月D日"
      default-view="timeGridWeek"
      locale="zh-cn"
      @dateClick="handleDateClick"
      @select="handleSelect"
      @eventMouseEnter="handlemouseEnter"
      resources= "[
    {
      id:'a',
      title:'Resource A',
      businessHours:{
        startTime: '10:00',
        endTime: '18:00'
      }
    }]"
    />
    <Modal
      v-model="modal1"
      title="Common Modal dialog box title"
      :mask-closable="false"
      :draggable="true"
      @on-ok="addEvent"
      @on-cancel="cancelAddEvent"
    >
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
 
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlulgin from "@fullcalendar/timegrid";
import "@fullcalendar/core/locales/zh-cn"; // 支持中文
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction"; // 加载交互插件，使得可以点击拖动选择
import listPlugin from "@fullcalendar/list";

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      modal1:false,
      Events: [
        {
          title: "开发团队小组会议",
          start: "2019-11-25 10:00:00",
          end: "2019-11-25 16:00:00",
          color: "orange"
        },
        {
          title: "商学院小组会议",
          start: "2019-11-26 11:00:00",
          end: "2019-11-26 20:00:00",
          color: "orange"
        },
        {
          title: "北理珠信管学术会议",
          start: '2019-11-26 15:00:00',
          end: '2019-11-26 22:00:00',
          color: "green"
        },
        {
        title:"My repeating event",
        daysOfWeek:[1,0],
        startTime:"13:00",
        endTime:"14:00"
    }
      ],
      
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlulgin,
        momentPlugin,
        interactionPlugin,
        listPlugin
      ],
      buttonText: {
        today: "今天",
        month: "月",
        week: "周",
        day: "天",
        listWeek: "清单",
        newWork: "新增"
      },
      // 随时判断时间是否合法，通过返回true/false来判断是否能够选择
      handlerSeelctAllow: info => {
        const currentDate = new Date();
        const start = info.start;
        const end = info.end;
        return start <= end && start >= currentDate;
      }
    };
  },
  methods: {
    // 当点击时候
    handleDateClick(arg) {
      console.log(arg);
    },
    // 当选择结束的时候获取开始和结束时间
    handleSelect(info) {
      console.log("form" + info.startStr + " to " + info.endStr);
    },
    handlemouseEnter: info => {
      console.log(info);
    },
    addEvent() {},
    cancelAddEvent() {}
  }
};
</script>
 

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "~@fullcalendar/list/main.css";
</style>
 