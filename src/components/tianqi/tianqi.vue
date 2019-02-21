<template>
  <div style="width:95%;margin:0 auto;margin-top:20px;">
    <!-- <el-select v-model="value" placeholder="请选择" @change="jh_chengshi">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>-->


    
    <el-button round type="primary" icon="el-icon-location-outline">当前位置：{{value}}</el-button>
    
    <el-button plain type="primary" style="margin-left:10px;">{{value}}当前温度：{{qiwen}} ℃</el-button>

    <el-input
      placeholder="搜索市、区、县等  / 按空格查询"
      prefix-icon="el-icon-search"
       v-model="sousuo"
      clearable
      @change="jh_chengshi"
      style="width:20%;margin-left:10px;"
    ></el-input>
   
    <el-button plain type="primary" style="margin-left:10px;">{{biaoti}}</el-button>

     
    

    

    <div id="myChart3" style="float:left"></div>
  </div>
</template>

<script>
// vue文件中引入echarts工具
// 引入基本模板
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
// 以下的组件按需引入
require("echarts/lib/component/tooltip"); // tooltip组件
require("echarts/lib/component/title"); //  title组件
require("echarts/lib/component/legend"); // legend组件
export default {
  data() {
    return {
      msg: [],
      biaoti: "",
      chengshi: "",
      qiwen: "",
      value: "",
      sousuo:''
    };
  },
  mounted() {
    this.tianqi();
    this.drawLine();
  },
  methods: {
    tianqi() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart3"));

      this.$axios.post("https://www.apiopen.top/weatherApi").then(res => {
        console.log(res.data.data);
        // console.log(res.data.data.forecast);
        this.biaoti = res.data.data.ganmao;
        this.qiwen = res.data.data.wendu;
        this.value = res.data.data.city;
        var rq = [];
        var gw = [];
        var dw = [];
        res.data.data.forecast.forEach(element => {
          // console.log(element.date)
          // console.log(element.high)
          // console.log(element.low)
          rq.push(element.date);
          gw.push(element.high.replace(/[^0-9]/gi, ""));
          dw.push(element.low.replace(/[^-0-9]/gi, ""));
        });

        myChart.setOption({
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["最高气温", "最低气温"]
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              dataView: { readOnly: false },
              magicType: { type: ["line", "bar"] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: rq
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          },
          series: [
            {
              name: "最高气温",
              type: "line",
              data: gw
            },
            {
              name: "最低气温",
              type: "line",
              data: dw
            }
          ]
        });
      });
    },

    drawLine() {
      //   // 基于准备好的dom，初始化echarts实例
      //   let myChart = echarts.init(document.getElementById("myChart"));
    },

    jh_chengshi(e) {
      // console.log(e);
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart3"));

      this.$axios
        .post("https://www.apiopen.top/weatherApi?city=" + e)
        .then(res => {
          console.log(res);
          if (res.data.code == 201) {
            this.$alert("输入有误哦", "标题名称", {
              confirmButtonText: "确定"
            });
            this.sousuo=''
          } else {
            // console.log(res.data.data.forecast);
            this.biaoti = res.data.data.ganmao;
            this.value = res.data.data.city;
             this.qiwen = res.data.data.wendu;
            this.sousuo=''
            var rq = [];
            var gw = [];
            var dw = [];
            res.data.data.forecast.forEach(element => {
              // console.log(element.date)
              // console.log(element.high)
              // console.log(element.low)
              rq.push(element.date);
              gw.push(element.high.replace(/[^0-9]/gi, ""));
              dw.push(element.low.replace(/[^-0-9]/gi, ""));
            });

            myChart.setOption({
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["最高气温", "最低气温"]
              },
              toolbox: {
                show: true,
                feature: {
                  dataZoom: {
                    yAxisIndex: "none"
                  },
                  dataView: { readOnly: false },
                  magicType: { type: ["line", "bar"] },
                  restore: {},
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: rq
              },
              yAxis: {
                type: "value",
                axisLabel: {
                  formatter: "{value} °C"
                }
              },
              series: [
                {
                  name: "最高气温",
                  type: "line",
                  data: gw
                },
                {
                  name: "最低气温",
                  type: "line",
                  data: dw
                }
              ]
            });
          }
        });
    }
  }
};
</script>
<style>
#myChart3 {
  width: 100%;
  height: 400px;
  background: #fff;
  border: #ccc9c9 dotted 1px;
  margin-top: 50px;
  padding-top: 30px;
}
#myChart3 > div {
  width: auto !important;
}
#myChart3 > div > canvas {
  width: 100% !important;
}

.biaoti {
  /* width: 70%; */
  line-height: 38px;
  text-align: center;
  font-weight: bold;
  padding: 0 10px;
 
  font-size: 14px;
  color: #949191;
  /* border: #ccc9c9 dotted 1px; */
}
.chengshi {
  width: 20%;
  line-height: 50px;
  float: left;
  border: #ccc9c9 dotted 1px;
}
</style>
