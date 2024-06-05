<template>
  <div>
    <nuxt-link to="/users/userslist">Back To Users List</nuxt-link>
    {{ this.user.name }} - {{ this.user.email }} - {{ this.user.age }} - {{ this.user.created_at }}
    {{ $route.params.id }}

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
    }
  },
// Odbierający komponent
created() {
  this.$root.$on('customEventName', this.handleEventData);
},
methods: {
  handleEventData(dataReceived) {
    this.user=dataReceived
  }
}
}
</script>

<style>
h1 {
  text-align: center;
}
</style>
