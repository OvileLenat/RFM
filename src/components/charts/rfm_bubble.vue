<template>
  <div ref="dom" class="charts rfm-bubble"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/lib/tools";
export default {
  name: "RfmBubble",

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
      // let legend = this.value.map(_ => _.name);
      let itemStyle = {
        normal: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      };
      let schema = [
        {name: 'R',index:0,text:'R'},
        {name:'F',index:1,text:'F'},
        {name:'M',index:2,text:'M'},
        {name:'RFM',index:3,text:'RFM'}
      ]
      let option = {
        
        color:[
          '#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a'
        ],
        // title: {
        //   text: "RFM"
        // },
        legend: {
          right: 10,
          data: [
            "重要价值客户",
            "重要保持客户",
            "重要发展客户",
            "重要挽留客户",
            "一般价值客户",
            "一般保持客户",
            "一般发展客户",
            "一般挽留客户"
          ]
        },
        tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
            var value = obj.value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + obj.seriesName + ' ' + value[0] + '日：'
                + value[7]
                + '</div>'
                + schema[1].text + '：' + value[1] + '<br>'
                + schema[2].text + '：' + value[2] + '<br>'
                + schema[3].text + '：' + value[3] + '<br>'
                + schema[4].text + '：' + value[4] + '<br>'
                + schema[5].text + '：' + value[5] + '<br>'
                + schema[6].text + '：' + value[6] + '<br>';
        }
    },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          scale: true
        },
        series: [
          {
            name: "重要价值客户",
            data: this.value[0],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
             itemStyle: itemStyle
          },
          {
            name: "重要保持客户",
            data: this.value[1],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: itemStyle
          },
          {
            name: "重要发展客户",
            data: this.value[2],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: itemStyle
          },
          {
            name: "重要挽留客户",
            data: this.value[3],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: itemStyle
          },
          {
            name: "一般价值客户",
            data: this.value[4],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: itemStyle
          },
          {
            name: "一般保持客户",
            data: this.value[5],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: itemStyle
          },
          {
            name: "一般发展客户",
            data: this.value[6],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: itemStyle
          },
          {
            name: "一般挽留客户",
            data: this.value[7],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: itemStyle
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