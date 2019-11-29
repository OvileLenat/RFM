<template>
  <div>
    <Row class="expand-row">
      <span class="expand-key">标题：</span>
      <span class="expand-value">{{ eventObject.title }}</span>
    </Row>
    <Row>
      <span class="expand-key">详细：</span>
      <span class="expand-value">{{ eventObject.extendedProps.description }}</span>
    </Row>
    <Row>
      <span class="expand-key">开始时间：</span>
      <span class="expand-value">{{ eventObject.start }}</span>
    </Row>
    <Row>
      <span class="expand-key">结束时间：</span>
      <span class="expand-ve">{{ eventObject.end }}</span>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    eventObject: Object
  }
};
</script>