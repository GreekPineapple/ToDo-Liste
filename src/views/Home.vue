<template>
  <div class="home">
    <HelloWorld/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default{
  name: 'home',
  components: {
    HelloWorld
  },
  mounted: function () {
    this.fetchData()
  },
  data () {
    return {
      test: null
    }
  },
  methods: {
    fetchData: function () {
      let apiURL = "http://localhost:8080/api/todos"
      
      let xhr = new XMLHttpRequest()
      console.log("test(xhr): ", xhr)
      xhr.open("GET", apiURL)
      xhr.onload = this.onFetchData
      xhr.send()
    },
    onFetchData: function (e: { target: any }) {
      let xhr = e.target

      console.log("test(res): ", xhr.responseText)
      this.test = xhr.responseText
    }
  }
}
</script>
