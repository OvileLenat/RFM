<template>
  <div ref="dom" class="charts rfm-pie"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/lib/tools";
export default {
  name: "RfmPie",
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let legend = this.value.map(_ => _.name);
      let option = {
        title: {
          // text: this.text,
          subtext: this.subtext,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
           position: 'right'
        },
        // legend: {
        //   orient: "vertical",
        //   x: "left",
        //   data: legend
        // },
        series: [
          {
            name: this.text,
            type: "pie",
            radius: ["50%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.value
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom, "tdTheme");
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
