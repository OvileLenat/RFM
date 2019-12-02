<template>
  <div>
    <Card>
      <Row>
        <Select v-model="rfmType" size="small" style="width:85px">
          <Option v-for="item in rfmTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Row>
      <Row></Row>
    </Card>
    <Card></Card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      rfmType:'r',
      rfmTypes: [
        {
          value: "r",
          label: "RFM - R"
        },
        {
          value: "f",
          label: "RFM - F"
        },
        {
          value: "m",
          label: "RFM - M"
        }
      ]
    };
  }
};
</script>

<style lang="" scoped>
</style>