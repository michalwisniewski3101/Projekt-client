<template>
  <v-container>
    <v-form ref="form"  @submit.prevent="submitForm">
      <v-text-field
        v-model="user.name"
        :label="this.$t('app.name')"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        :label="this.$t('app.email')"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.age"
        :label="this.$t('app.age')"
        required
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="user.address"
        :label="this.$t('app.address')"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.phone"
        :label="this.$t('app.phone')"
        required
      ></v-text-field>

      <v-btn color="success" type="submit">{{this.$t('app.submit')}}</v-btn>
    </v-form>
  </v-container>
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
    }



  },
  methods: {
    submitForm() {
       {
          this.user.created_at=this.formatDate();
          this.user.id=this.generateId();
          console.log("Form submitted:", this.user);
          this.$emit('addUser', this.user);
          
      }
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
};
</script>

<style scoped>

</style>
