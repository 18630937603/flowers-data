<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="price_line_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      chartInstance: null,
      allData: {
        sellerNames: [5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100],
        sellerValues: [33345, 49652, 36861, 59929, 24228, 50876, 24945, 14049, 14858, 15001, 18706]
      },
      titleFontSize: 0
    }
  },
  mounted () {
    this.initChart()
    // this.getData()
    window.addEventListener('resize', this.screenAdapter)
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter()
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化echartInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.price_line_ref, this.theme)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '▎分段价格销量统计',
          left: 20,
          top: 20
        },
        grid: {
          top: '30%',
          left: '16%',
          right: '15%',
          bottom: '10%',
          containLabel: false // 距离是包含坐标轴上的文字
        },
        xAxis: {
          type: 'category',
          data: this.allData.sellerNames
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              // color: '#2D3443'
              show: true
            }
          }
        },
        series: [
          {
            type: 'line',
            label: {
              show: false,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              // 指明颜色渐变的方向
              // 指明不同百分比之下颜色的值
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 百分之0状态之下的颜色值
                {
                  offset: 0,
                  color: '#5052EE'
                },
                // 百分之100状态之下的颜色值
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            },
            smooth: true,
            data: this.allData.sellerValues
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    screenAdapter () {
      this.chartInstance.resize()
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme () {
      console.log('主题切换了')
      this.chartInstance.dispose() // 销毁当前的图表
      this.initChart() // 重新以最新的主题名称初始化图表对象
      this.screenAdapter() // 完成屏幕的适配
      this.updateChart() // 更新图表的展示
    }
  }
}
</script>

<style lang="less" scoped>

</style>
