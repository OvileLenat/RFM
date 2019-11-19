<template>
  <div ref="dom" class="charts rfm-bar"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/lib/tools";
export default {
  name: "RfmBar",
  props: {
    value: Object,
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
      let colors = [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a"
      ];
      let option = {
        // dataset: {
        //   source: [
        //     ["color", "amount", "product"],
        //     ["#c23531", 6, "Matcha Latte"],
        //     ["#2f4554", 6, "Milk Tea"],
        //     ["#61a0a8", 7, "Cheese Cocoa"],
        //     ["#d48265", 5, "Cheese Brownie"],
        //     ["#91c7ae", 2, "Matcha Cocoa"],
        //     ["#749f83", 4, "Tea"],
        //     ["#ca8622", 4, "Orange Juice"],
        //     ["#bda29a", 4, "Lemon Juice"]
        //   ]
        // },
        grid: { containLabel: true },
        xAxis: {  },
        yAxis: {
          inverse:true,
          show:false,
          type: "category"
        },
        // visualMap: {
        //     orient: 'horizontal',
        //     left: 'center',
        //     min: 10,
        //     max: 100,
        //     text: ['High Score', 'Low Score'],
        //     // Map the score column to color
        //     dimension: 0,
        //     inRange: {
        //         color: ['#D7DA8B', '#E15457']
        //     }
        // },
         tooltip: {
        position: 'right'
    },
        series: [
          {
            type: "bar",
            // encode: {
            //   // 映射
            //     // Map the "amount" column to X axis.
            //     x: 'amount',
            //     // Map the "product" column to Y axis
            //     y: 'product',

            // }
            data: [
              {
                name: legend[0],
                value: this.value[0].value,
              
                  itemStyle: {
                    color:  colors[0]
                  }
                
              },
              {
                name: this.value[1].name,
                value: this.value[1].value,
                  itemStyle: {
                    color: colors[1]
                  }
              },
              {
                name: this.value[2].name,
                value: this.value[2].value,
                  itemStyle: {
                    color: colors[2]
                  }
              },
              {
                name: this.value[3].name,
                value: this.value[3].value,
                  itemStyle: {
                    color: colors[3]
                  }
              },
              {
                name: this.value[4].name,
                value: this.value[4].value,
                  itemStyle: {
                    color: colors[4]
                  }
              },
              {
                name: this.value[5].name,
                value: this.value[5].value,
                  itemStyle: {
                    color: colors[5]
                  }
              },
              {
                name: this.value[6].name,
                value: this.value[6].value,
                  itemStyle: {
                    color: colors[6]
                  }
              },
              {
                name: this.value[7].name,
                value: this.value[7].value,
                  itemStyle: {
                    color: colors[7]
                  }
              },
              
            ]
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
