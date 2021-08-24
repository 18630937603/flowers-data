<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
        <img :src="headerSrc" alt="">
      </div>
      <span class="title">仿真花卉市场销售情况</span>
      <div class="title-right">
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme">
        <span class="datetime">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.wordcloud ? 'fullscreen' : '']">
          <!-- 销量趋势图表 -->
          <WordCloud ref="wordcloud"></WordCloud>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('wordcloud')"
                  :class="['iconfont', fullScreenStatus.wordcloud ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.brandbar ? 'fullscreen' : '']">
          <!-- 商家销售金额图表 -->
          <BrandBar ref="brandbar"></BrandBar>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('brandbar')"
                  :class="['iconfont', fullScreenStatus.brandbar ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle"></section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.priceline ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <PriceLine ref="priceline"></PriceLine>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('priceline')"
                  :class="['iconfont', fullScreenStatus.priceline ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.locationpie ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <LocationPie ref="locationpie"></LocationPie>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('locationpie')"
                  :class="['iconfont', fullScreenStatus.locationpie ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import BrandBar from '@/components/BrandBar'
import PriceLine from '@/components/PriceLine'
import WordCloud from '@/components/WordCloud'
import LocationPie from '@/components/LocationPie'
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'

export default {
  data() {
    return {
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        brandbar: false,
        priceline: false,
        wordcloud: false,
        locationpie: false
      },
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      const date = this.$dayjs(new Date())
      this.dateDay = date.format('HH:mm:ss')
      this.dateYear = date.format('YYYY-MM-DD')
      this.dateWeek = date.format(this.weekday[date.day()])
    }, 200)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    changeSize(chartName) {
      // 1.改变fullScreenStatus的数据
      this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      // 2.需要调用每一个图表组件的screenAdapter的方法
      // this.$refs[chartName].screenAdapter()
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
    },
    // 接收到全屏数据之后的处理
    handleChangeTheme() {
      // 修改VueX中数据
      this.$store.commit('changeTheme')
    }
  },
  components: {
    BrandBar,
    PriceLine,
    WordCloud,
    LocationPie
  },
  computed: {
    headerSrc() {
      return '/static/img/' + getThemeValue(this.theme).headerBorderSrc
    },
    themeSrc() {
      return '/static/img/' + getThemeValue(this.theme).themeSrc
    },
    containerStyle() {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor
      }
    },
    ...mapState(['theme'])
  }
}
</script>
<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
  background: #eeeeee;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;

  > div {
    img {
      width: 100%;
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }

  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-80%);
  }

  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }

  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }

  .logo {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-80%);

    img {
      height: 35px;
      width: 128px;
    }
  }
}

.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;

  .screen-left {
    height: 100%;
    width: 50%;

    #left-top {
      height: 43%;
      position: relative;
    }

    #left-bottom {
      height: 40%;
      margin-top: 25px;
      position: relative;
    }
  }

  .screen-middle {
    height: 100%;
    width: 0;
    margin-left: 1.6%;
    margin-right: 1.6%;

    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }

    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }

  .screen-right {
    height: 100%;
    width: 50%;

    #right-top {
      height: 43%;
      position: relative;
    }

    #right-bottom {
      height: 41%;
      margin-top: 25px;
      position: relative;
    }
  }
}

.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
