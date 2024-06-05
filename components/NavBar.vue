<template>
  <nav>

    <v-app-bar app>
      
      <v-toolbar-title @click="drawer = !drawer" class="text-uppercase grey--text">
        <v-btn text color="grey" big>
        <span class="font-weight-light">      <v-icon>
        mdi-home
      </v-icon>
    </span>
        <span>{{$t('app.menu')}}</span></v-btn>
        
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <langSwitcher />
      <v-spacer></v-spacer>
      <v-btn text color="grey">
          
        <span><v-icon>
          mdi-logout
      </v-icon>{{this.$t('app.logOut')}}</span>
        
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="indigo">
      <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.value"> {{item.title}}</v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import langSwitcher from './langSwitcher.vue'
export default {
  components: { langSwitcher },
  data() {
    return {
      drawer: false

    }

  },
  computed:{
    items(){
      return [
      {
          title: this.$t('app.serverList'),
          value: '/serversList',
        },
        {
          title: this.$t('app.appList'),
          value: '/appsList',
        },
        {
          title: this.$t('app.taskList'),
          value: '/tasksList',
        },
      ]

    }

  }

}
</script>

<style>

</style>