<template>
  <div class="home">
    123
    <scroll-select-l :columns="b" :joiner="[':', ',']" v-model="a"></scroll-select-l>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      a: '',
      b: [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        ['cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd', 'cpdd'],
        ['哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈', '哈哈']]
    }
  },
  components: {
  }
}
</script>
