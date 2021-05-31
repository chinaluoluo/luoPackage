<template>
<ul :class="[diffClass, 'scroll-bar-l']" id="scrollBar">
  <li :class="{'each-value-l': true, 'is-active-l': activeIndex === index}" v-for="(item, index) in list" :key="index">{{ item }}</li>
</ul>
</template>

<script>

export default {
  name: 'scrollBarL',
  props: {
    isShow: {
      type: Boolean,
      default: () => false
    },
    diffClass: {
      type: String,
      default: () => 'scroll-bar-l'
    },
    list: {
      type: Array,
      default: () => []
    },
    value: {
      default: () => ''
    }
  },
  mounted () {
    const self = this
    const cardScroll = document.querySelector('.' + this.diffClass)
    cardScroll.addEventListener('scroll', () => {
      if (self.timeValue) {
        clearTimeout(self.timeValue)
        self.timeValue = null
      }
      if (!self.isReset) {
        const index = parseInt(cardScroll.scrollTop / 30)
        self.activeIndex = index
      }
      self.timeValue = setTimeout(() => {
        if (cardScroll.scrollTop > cardScroll.scrollHeight) {
          cardScroll.scrollTop = cardScroll.scrollHeight
        }
        if (!self.isReset) {
          cardScroll.scrollTop = self.activeIndex * 30
          self.isReset = true
          setTimeout(() => {
            self.isReset = false
          }, 200)
        }
      }, 300)
    })
  },
  computed: {
    activeIndex: {
      get: function () {
        let index = 0
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i] === this.value) {
            index = i
            break
          }
        }
        return index
      },
      set: function (data) {
        this.$emit('input', this.list[data])
      }
    }
  },
  data () {
    return {
      timeValue: null,
      isReset: false
    }
  },
  watch: {
    isShow: {
      immediate: true,
      handler: function (data) {
        if (data) {
          this.setScroll()
        }
      }
    }
  },
  methods: {
    getValue () {
      return this.list[this.activeIndex]
    },
    setScroll () {
      this.$nextTick(() => {
        if (this.activeIndex === 0) {
          this.$emit('input', this.list[0])
        }
        const cardScroll = document.querySelector('.' + this.diffClass)
        if (cardScroll) {
          cardScroll.style.overflowY = 'auto'
          cardScroll.scrollTop = this.activeIndex * 30
          this.isReset = true
          setTimeout(() => {
            this.isReset = false
            cardScroll.style.overflowY = 'hidden'
          }, 200)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-bar-l {
  z-index: 3;
  font-size: 12px;
  padding: 20px 15px 80px;
  position: relative;
  display: inline-block;
  margin-top: 0;
  max-height: 100px;
  //width: 30px;
  overflow-y: hidden;
  ul,li {
    list-style: none;
  }
  .each-value-l {
    height: 20px;
    line-height: 20px;
    margin: 10px 0;
  }
  .value-line-l {
    width: 100%;
    height: 32px;
    position: absolute;
    top: 50%;
    bottom: 50%;
  }
  .is-active-l {
    font-weight: 700;
    color: #303133;
  }
  .each-value-l:first-child {
    margin-top: 83px;
  }
}

.scroll-bar-l:hover {
  overflow-y: auto !important;
}
.scroll-bar-l::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.scroll-bar-l::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : rgba(144,147,153,.3);
}
.scroll-bar-l::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  //box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  //border-radius: 10px;
  background   : #ffffff;
}
</style>
