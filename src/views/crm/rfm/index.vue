<template>
  <FullCalendar
  defaultView="dayGridMonth"
  height="parent"
  @dateClick="handleDateClick"
  :plugins="calendarPlugins"
  locale="esLocale"
  :header="{
  left:'prevYear,prev,next,nextYear today',
  center:'title',
  right:'dayGridMonth,dayGridWeek,dayGridDay'
  }"
  :buttonText="buttonText"
  :events="events"
  />
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    return {
      buttonText: {
        today: "今天",
        month: "月",
        week: "周",
        day: "天"
      },
      events: [
        {
          title: "全天计划\r\n#####\r\n写代码",
          start: '2019-11-23T14:30:00'
        },
        {
          title: "张家界四日游",
          start: '2019-11-20',
          end: '2019-11-24'
        },
        {
          id: 999,
          title: "电话回访客户",
          start: '2019-11-22',
          allDay: false
        }
      ],
      calendarPlugins: [dayGridPlugin]
    };
  },
  methods: {
    handleDateClick(arg) {
      alert(arg.date);
    }
  }
};
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>