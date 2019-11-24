<template>
  <Table
    :row-class-name="rowClassName"
    height="500"
    minWidth="100"
    :columns="columns5"
    :data="data5"
    size="small"
  ></Table>
</template>
<script>
export default {
  name: "RfmTable",
  props: {
    value: Array,
    text: String,
    subtext: String
    // height: {
    //   type: [Number, String]
    // },
  },
  data() {
    return {
      columns5: [
        {
          title: "Name",
          key: "name",
          sortable: true,
          minWidth: 70,
          tooltip: true
        },
        {
          title: "Group",
          key: "group",
          sortable: true,
          tooltip: true,
          minWidth:80
        },
        {
          title: "R",
          key: "r",
          sortable: true,
          tooltip: true,
          width: 70
        },
        {
          title: "F",
          key: "f",
          sortable: true,
          tooltip: true,
          width: 70
        },
        {
          title: "M",
          key: "m",
          sortable: true,
          tooltip: true,
          width: 70,
          
        },
        {
          title: "RFM",
          key: "rfm",
          sortable: true,
          tooltip: true,
          fixed: "right",
          width: "70"
        }
      ],
      data5: [
        {
          name: "Ben Affleck",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 100
        },
        {
          name: "Colin Farrell",
          group: "一般保持客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Hugh Jackman",
          group: "一般保持客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Johnny Depp",
          group: "重要发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Ewan McGregor",
          group: "重要发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Jude Law",
          group: "重要发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Keanu Reeves",
          group: "重要发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Leonardo DiCaprio",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Orlando Bloom",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Tom Cruise",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Brandon Routh",
          group: "重要挽留客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Will Smith",
          group: "重要挽留客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Chris Evans",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Jake Gyllenhaal",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Tobey Maguire",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Topher Grace",
          group: "重要价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Paul Walker",
          group: "一般价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Ryan Reynolds",
          group: "一般发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Jared Leto",
          group: "重要发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Wentworth Miller",
          group: "一般价值客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Ian Joseph Somerhalder",
          group: "一般挽留客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Adam Brody",
          group: "一般挽留客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "justin theroux",
          group: "一般挽留客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Gaspard Ulliel",
          group: "一般发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Aaron Carter",
          group: "重要保持客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "Ronan Keating",
          group: "一般发展客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        },
        {
          name: "emma roberts",
          group: "重要保持客户",
          r: 90,
          f: 100,
          m: 75.42,
          rfm: 90
        }
      ]
    };
  },
  methods: {
    rowClassName(row, index) {
      console.log(row)
      let groupName = row.group;
      if (groupName === "重要价值客户") {
        return "demo-table-info-cell-one";
      } else if (groupName === "重要保持客户") {
        return "demo-table-info-cell-two";
      } else if (groupName === "重要发展客户") {
        return "demo-table-info-cell-three";
      } else if (groupName === "重要挽留客户") {
        return "demo-table-info-cell-four";
      } else if (groupName === "一般价值客户") {
        return "demo-table-info-cell-five";
      } else if (groupName === "一般保持客户") {
        return "demo-table-info-cell-six";
      } else if (groupName === "一般发展客户") {
        return "demo-table-info-cell-seven";
      } else if (groupName === "一般挽留客户") {
        return "demo-table-info-cell-eight";
      }
      return "";
    }
  }
};
</script>
<style>
.ivu-table .demo-table-info-cell-one td{
  background-color: #c23531;
  color: #fff;
}
.ivu-table .demo-table-info-cell-two td{
  background-color: #2f4554;
  color: #fff;
}
.ivu-table .demo-table-info-cell-three td{
  background-color: #61a0a8;
  color: #fff;
}
.ivu-table .demo-table-info-cell-four td{
  background-color: #d48265;
  color: #fff;
}
.ivu-table .demo-table-info-cell-five td{
  background-color: #91c7ae;
  color: #fff;
}
.ivu-table .demo-table-info-cell-six td{
  background-color: #749f83;
  color: #fff;
}
.ivu-table .demo-table-info-cell-seven td{
  background-color: #ca8622;
  color: #fff;
}
.ivu-table .demo-table-info-cell-eight td{
  background-color: #bda29a;
  color: #fff;
}
</style>