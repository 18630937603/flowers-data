<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="word_cloud_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'echarts-wordcloud'

export default {
  data() {
    return {
      chartInstance: null,
      titleFontSize: 0,
      keywords: [
        { name: '干花', value: '60066' },
        { name: '绢花', value: '49126' },
        { name: '大型', value: '45047' },
        { name: '插花', value: '42705' },
        { name: '玫瑰花', value: '27601' },
        { name: '藤条', value: '16619' },
        { name: '向日葵', value: '16233' },
        { name: '绿植', value: '14219' },
        { name: '郁金香', value: '10736' },
        { name: '雏菊', value: '10350' },
        { name: '真花', value: '10737' },
        { name: '兰仿', value: '10167' },
        { name: '藤蔓', value: '8766' },
        { name: '樱花', value: '8165' },
        { name: '荷花', value: '7733' },
        { name: '桃花', value: '7648' },
        { name: '竹子', value: '6981' },
        { name: '红果', value: '5841' },
        { name: '芦苇', value: '5797' }
      ]
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
      this.chartInstance = this.$echarts.init(this.$refs.word_cloud_ref, this.theme)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '▎搜索关键词',
          left: 20,
          top: 20
        },
        series: [{
          type: 'wordCloud',
          sizeRange: [15, 80],
          rotationRange: [0, 0],
          rotationStep: 45,
          gridSize: 8,
          shape: 'pentagon',
          width: '100%',
          height: '100%',
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            }
          },
          data: this.keywords
        }]
      }
      this.chartInstance.setOption(initOption)
      // 对图表对象进行鼠标事件的监听
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
