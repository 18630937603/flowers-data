<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="location_pie_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      chartInstance: null
    }
  },
  mounted() {
    this.initChart()
    // this.getData()
    window.addEventListener('resize', this.screenAdapter)
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter()
  },
  destroyed() {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.location_pie_ref, this.theme)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '▎地区销量统计',
          left: 20,
          top: 20
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            data: [
              { value: 35354, name: '上海' },
              { value: 486, name: '云南' },
              { value: 7780, name: '北京' },
              { value: 3850, name: '四川' },
              { value: 2664, name: '天津' },
              { value: 9530, name: '安徽' },
              { value: 29291, name: '山东' },
              { value: 152, name: '山西' },
              { value: 53962, name: '广东' },
              { value: 4, name: '广西' },
              { value: 41093, name: '江苏' },
              { value: 6191, name: '江西' },
              { value: 33572, name: '河北' },
              { value: 17242, name: '河南' },
              { value: 148635, name: '浙江' },
              { value: 3053, name: '湖北' },
              { value: 6727, name: '湖南' },
              { value: 6727, name: '福建' },
              { value: 215, name: '辽宁' },
              { value: 2326, name: '重庆' },
              { value: 2286, name: '陕西' }
            ],
            center: ['40%', '50%'],
            radius: '70%',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: false
            }
          }
        ],
        legend: {
          orient: 'vertical',
          right: '15%',
          top: '10%'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    screenAdapter() {
      this.chartInstance.resize()
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme() {
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
