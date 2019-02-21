<template>
	<div class="sy_bao animated fadeIn">
		<div id="myChart" :style="{width: '800px', height: '800px'}" style="float:left"></div>
		<div id="myChart2" :style="{width: '800px', height: '800px'}" style="float:right"></div>
	</div>
</template>
<script>
	// 引入基本模板
	let echarts = require("echarts/lib/echarts");
	// 引入柱状图组件
	require("echarts/lib/chart/bar");
	// 引入提示框和title组件
	require("echarts/lib/component/tooltip");
	require("echarts/lib/component/title");
	export default {
		name: "hello",
		data() {
			return {
				msg: "Welcome to Your Vue.js App"
			};
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
				// 绘制图表
				var a = ['css3', 'Vue.js', 'javascript', 'Photoshop', 'Jquery', 'ddd']
				myChart.setOption({
					title: {
						// text: '世界人口总量',
						// subtext: '数据来自网络'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['2019年']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01]
					},
					yAxis: {
						type: 'category',
						data: a
					},
					series: [
						{
							name: '2019年',
							type: 'bar',
							data: [80, 80, 85, 90, 95, 95]
						}
					]
				});

				var b=  ['写代码', '打豆豆', '看电影', '睡觉觉']
				myChart2.setOption({
					title: {
						
						
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						// orient: 'vertical',
						left: 'center',
						data:b
					},
					series: [{
						name: '数据分析',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: [{
								value: 90,
								name: '写代码'
							},
							{
								value: 60,
								name: '打豆豆'
							},
							{
								value: 50,
								name: '看电影'
							},
							{
								value: 90,
								name: '睡觉觉'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});

			}
		}
	};
</script>

<style>
	.sy_bao {
		background: #fff;
		height: 500px;
		padding: 0px;
	}
</style>