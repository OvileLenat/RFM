<script>
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarPlugins: [ dayGridPlugin ]
    }
  }
}

</script>

<template>
  <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" />
</template>