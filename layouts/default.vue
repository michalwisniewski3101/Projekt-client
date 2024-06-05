<template>
  <v-app class="grey lighten-4">
    <NavBar />

    <v-main class="mx-4 mb-4">
      <Nuxt />
    </v-main>
    
  </v-app>
</template>

<script>
//import { RouterView } from 'vue-router';



export default {
  name: 'App',

  data: () => ({
    text:"tekst"
    
  }),
 
};
</script>



