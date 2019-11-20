<template>
  <div>
    <Row :gutter="14">
      <i-col span="3">
        <Card>
          <p slot="title">RFM 权重</p>
          <p>{{ classification }}</p>
        </Card>
      </i-col>
      <i-col span="5">
        <Card>
          <p slot="title">Date(R)</p>
          <p>
            <DatePicker size="small" type="date" placeholder="Select date" :options="dueDate"></DatePicker>
          </p>
        </Card>
      </i-col>
      <i-col span="4">
        <Card>
          <p slot="title">F</p>
          <p>
            <Select v-model="Fselect" size="small">
              <Option v-for="item in FList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
        </Card>
      </i-col>
      <i-col span="3">
        <Card>
          <p slot="title" style="height:20px;">X轴</p>
          <p>
            <Select v-model="Xselect" size="small">
              <Option v-for="item in RFMList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
        </Card>
      </i-col>
      <i-col span="3">
        <Card>
          <p slot="title">Y轴</p>
          <p>
            <Select v-model="Yselect" size="small">
              <Option v-for="item in RFMList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
        </Card>
      </i-col>

      <i-col span="5">
        <Card>
          <p slot="title">上次更新时间：</p>
          <p>
            <Button type="primary" size="small" long>更新</Button>
          </p>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="10" style="margin-top: 10px;">
      <i-col :md="24" :lg="4" style="margin-bottom: 20px;">
        <Card shadow>
          <rfm-pie style="height: 100px;" :value="RfmPie" text="RFM 平均分值"></rfm-pie>
        </Card>
        <Card shadow>
          <rfm-bar style="height: 368px;" :value="RfmBar" text="RFM 平均分值"></rfm-bar>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <rfm-bubble style="height: 500px;" :value="RfmBubble" text="Bubble"/>
        </Card>
      </i-col>
       <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
         <Card shadow>
       <rfm-table style="height: 500px;" :value="RfmBubble" text="Table"/>
       </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { RfmPie, RfmBubble, RfmBar, RfmTable } from "_c/charts";
export default {
  name: "",
  components: {
    RfmPie,
    RfmBubble,
    RfmBar,
    RfmTable
  },
  data() {
    return {
      Fselect: "Sales Volume",
      Xselect: "RFM.R",
      Yselect: "RFM.F",
      dueDate: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now() - 86400000;
        }
      },
      classification: "AVG",
      RfmPie: [
        { value: 333, name: "R" },
        { value: 334, name: "F" },
        { value: 234, name: "M" }
      ],
      RfmBubble: [
        [
          [28604, 77, 17096869, "Australia", "重要价值客户"],
          [31163, 77.4, 27662440, "Canada", "重要价值客户"],
          [1516, 68, 1154605773, "China", "重要价值客户"],
          [13670, 74.7, 10582082, "Cuba", "重要价值客户"],
          [28599, 75, 4986705, "Finland", "重要价值客户"],
          [29476, 77.1, 56943299, "France", "重要价值客户"]
        ],
        [
          [31476, 75.4, 78958237, "Germany", "重要保持客户"],
          [28666, 78.1, 254830, "Iceland", "重要保持客户"],
          [1777, 57.7, 870601776, "India", "重要保持客户"],
          [29550, 79.1, 122249285, "Japan", "重要保持客户"],
          [2076, 67.9, 20194354, "North Korea", "重要保持客户"],
          [12087, 72, 42972254, "South Korea", "重要保持客户"]
        ],
        [
          [24021, 75.4, 3397534, "New Zealand", "重要发展客户"],
          [43296, 76.8, 4240375, "Norway", "重要发展客户"],
          [10088, 70.8, 38195258, "Poland", "重要发展客户"],
          [19349, 69.6, 147568552, "Russia", "重要发展客户"],
          [10670, 67.3, 53994605, "Turkey", "重要发展客户"],
          [26424, 75.7, 57110117, "United Kingdom", "重要发展客户"],
          [37062, 75.4, 252847810, "United States", "重要发展客户"]
        ],
        [
          [44056, 81.8, 23968973, "Australia", "重要挽留客户"],
          [43294, 81.7, 35939927, "Canada", "重要挽留客户"],
          [13334, 76.9, 1376048943, "China", "重要挽留客户"],
          [21291, 78.5, 11389562, "Cuba", "重要挽留客户"],
          [38923, 80.8, 5503457, "Finland", "重要挽留客户"]
        ],

        [
          [37599, 81.9, 64395345, "France", "一般价值客户"],
          [44053, 81.1, 80688545, "Germany", "一般价值客户"]
        ],
        [
           [64304, 81.6, 5210967, "Norway", "一般保持客户"],
          [24787, 77.3, 38611794, "Poland", "一般保持客户"],
          [23038, 73.13, 143456918, "Russia", "一般保持客户"],
          [19360, 76.5, 78665830, "Turkey", "一般保持客户"]
        ],
        [
          [36162, 83.5, 126573481, "Japan", "一般发展客户"],
          [1390, 71.4, 25155317, "North Korea", "一般发展客户"],
          [34644, 80.7, 50293439, "South Korea", "一般发展客户"],
          [34186, 80.6, 4528526, "New Zealand", "一般发展客户"]
        ],
        [
           [42182, 82.8, 329425, "Iceland", "一般挽留客户"],
          [5903, 66.8, 1311050527, "India", "一般挽留客户"],
          [38225, 81.4, 64715810, "United Kingdom", "一般挽留客户"],
          [53354, 79.1, 321773631, "United States", "一般挽留客户"]
        ]
      ],
RfmBar:[
  {name:"重要价值客户",value:6},
   {name:"重要保持客户",value:6},
   {name:"重要发展客户",value:7},
   {name:"重要挽留客户",value:5},
   {name:"一般价值客户",value:2},
   {name:"一般保持客户",value:4},
   {name:"一般发展客户",value:4},
   {name:"一般挽留客户",value:4},
  
],
      FList: [
        {
          value: "Sales Volume",
          label: "Sales Volume"
        },
        {
          value: "Profit",
          label: "Profit"
        },
        {
          value: "Quantity",
          label: "Quantity"
        }
      ],
      RFMList: [
        {
          value: "RFM.R",
          label: "RFM.R"
        },
        {
          value: "RFM.F",
          label: "RFM.F"
        },
        {
          value: "RFM.M",
          label: "RFM.M"
        }
      ]
    };
  }
};
</script>

<style lang="" scoped>
</style>