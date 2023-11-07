<template>
  <v-app>
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home.vue';
import Test from './components/Test.vue';

export default {
  name: 'App',

  components: {
    Home,
    Test
  },

  data: () => ({
    //
  }),
}
</script>
