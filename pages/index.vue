<template>
<v-app >

    <h1 class='center'>{{this.$t('app.main')}}</h1>
    
    
      


</v-app>
</template>
  
<script>

  
  
  
  export default {
    name: 'App',
  
    data: () => ({
      text:"tekst"
      
    }),
    mounted() {
    console.log(this.$i18n); // Should not be undefined
  }
   
  };
  </script>
<style>
h1{
    text-align: center;
}



</style>