<template>
    <div>
      <h1>{{$t('app.usersList')}}</h1>
      <ul>
        
        <li v-for="userr in users" :key="userr.id">
          <nuxt-link :to="'/users/'+userr.id" >{{ userr.name }} - {{ userr.email }}</nuxt-link>
        </li>
      </ul>


      <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">{{$t('app.addUser')}}</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="headline mb-0">{{$t('app.addUser')}}</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field v-model="user.name" :label="$t('app.name')" required></v-text-field>
          <v-text-field v-model="user.email" :label="$t('app.email')" required></v-text-field>
          <v-text-field v-model="user.age" :label="$t('app.age')" required type="number"></v-text-field>
          <v-text-field v-model="user.address" :label="$t('app.address')" required></v-text-field>
          <v-text-field v-model="user.phone" :label="$t('app.phone')" required></v-text-field>
          <v-btn color="success" type="submit">{{$t('app.submit')}}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

    </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      user: {
        id: null,
        name: "",
        email: "",
        age: null,
        address: "",
        phone: "",
        created_at: ""
      },
      dialog:false,
    }



  },
    async asyncData({ $axios }) {
      try {
        const users = await $axios.$get('/users.json')
        return { users }
      } catch (error) {
        console.error(error)
        return { users: [] }
      }
    },

    methods: {
    submitForm() {
       
          this.user.created_at=this.formatDate();
          this.user.id=this.generateId();
          console.log("Form submitted:", this.user);
          this.users.push(this.user);
          this.dialog=false;

    },

    linkClick(user) {
      this.$root.$emit('customEventName', user);
      console.log(user)

    },
    formatDate() {
      const date = new Date();
      const pad = (num) => num.toString().padStart(2, '0');
      
      const year = date.getUTCFullYear();
      const month = pad(date.getUTCMonth() + 1);
      const day = pad(date.getUTCDate());
      const hours = pad(date.getUTCHours());
      const minutes = pad(date.getUTCMinutes());
      const seconds = pad(date.getUTCSeconds());
      
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
},
generateId() {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 10000);
      const id = `${timestamp}-${random}`;
      return id;
    }

  }


  }
  </script>
  
    <style>
    h1{
        text-align: center;
    }
    
    </style>