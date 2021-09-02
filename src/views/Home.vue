<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <CustomCard title="Welcome to Your Vue.js App" />

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CustomCard from "@/components/CustomCard";

export default {
  name: 'Home',
  components: {
    CustomCard, HelloWorld
  }
}
</script>
