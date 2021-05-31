<template>
<div class="scroll-select-l">
  <div style="visibility: hidden" ref="popHiddenL"></div>
  <el-popover
    placement="bottom"
    width="300"
    @show="changeScroll"
    @hide="hidePop"
    :disabled="disabled"
    trigger="click">
    <el-input @blur="inputBlur" :class="{'is-error': error}" slot="reference" :disabled="disabled" :placeholder="placeholder" class="scroll-input-l" :value="selectValue"></el-input>
    <div class="select-bar-l">
      <div class="all-var-l">
        <scrollBarL :isShow="isShow" v-model="activeValue[index]" ref="scrollBarL" v-for="(item, index) in columns" :diffClass="'scroll-bar-l' + parseInt(Math.random() * 1000)" :list="item" :key="index"></scrollBarL>
      </div>
      <el-divider></el-divider>
      <div class="scroll-footer-l">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button type="text" @click="submit">确定</el-button>
      </div>

    </div>
  </el-popover>
</div>
</template>

<script>
import scrollBarL from './scrollBarL'
export default {
  name: 'scrollSelectL',
  props: {
    error: Boolean,
    joiner: {
      type: Array,
      default: () => [
      ]
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    placeholder: {
      type: String,
      default: () => '请选择'
    },
    columns: {
      type: Array,
      default: () => [
      ]
    },
    value: {
      default: () => []
    }
  },
  components: {
    scrollBarL
  },
  computed: {
    activeValue: function () {
      if (this.value.length < this.columns.length) {
        return Array.from(new Array(this.columns.length), () => '')
      }
      return this.value
    }
  },
  mounted () {
  },
  data () {
    return {
      oldValue: [],
      selectValue: '',
      isShow: false
    }
  },
  watch: {
    activeValue: {
      deep: true,
      immediate: true,
      handler: function (data) {
        this.selectValue = ''
        if (data[0] !== '') {
          for (let i = 0; i < data.length; i++) {
            const join = this.joiner[i] ? this.joiner[i] : ' '
            this.selectValue = this.selectValue + data[i] + join
          }
        }

        this.$emit('input', data)
      }
    }
  },
  methods: {
    inputBlur () {
      this.$emit('blur')
    },
    changeScroll () {
      this.isShow = true
      this.oldValue = [].concat(this.value)
    },
    hidePop () {
      this.isShow = false
    },
    cancel () {
      for (let i = 0; i < this.columns.length; i++) {
        this.$set(this.activeValue, i, this.oldValue[i])
      }
      this.$refs.popHiddenL.click()
    },
    submit () {
      this.oldValue = this.activeValue
      this.$refs.popHiddenL.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-select-l {
  //width: 180px;
  position: relative;
  ::v-deep input {
    cursor: pointer;
  }
  .scroll-input-l {
    //width: 180px;
  }
  .is-error {
    border-color: #F56C6C;
  }
}
.all-var-l {
  position: relative;
  display: flex;
  justify-content: space-around;
}
.all-var-l:before {
  content: "";
  top: 50%;
  position: absolute;
  margin-top: -15px;
  height: 32px;
  z-index: -1;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding-top: 6px;
  text-align: left;
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.all-var-l:after {
  content: "";
  top: 50%;
  position: absolute;
  margin-top: -15px;
  height: 32px;
  z-index: -1;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding-top: 6px;
  text-align: left;
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.select-bar-l {
}
.select-line-l {
  position: absolute;
  top: 38%;
  width: 100%;
  z-index: 2;
}
.scroll-footer-l {
  margin-top: -15px;
  margin-bottom: -10px;
  text-align: right;
}
</style>
<style lang="scss">
.scroll-select-l {
  .el-popover {
    //width: calc(100%);
  }
}
</style>
