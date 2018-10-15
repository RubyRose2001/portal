<template>
  <div class="hello">
    <el-button @click="jump">点击一下你就知道</el-button>
    <el-button @click="glabal">vuex</el-button>
    <span>{{ global }}</span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  computed: {
    ...mapGetters([
      'global'
    ])
  },
  methods: {
    ...mapActions([
      'setGlobel'
    ]),
    glabal() {
      this.setGlobel(false);
      console.log(this.global);
    },
    jump() {
      this.$router.push('/button');
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
