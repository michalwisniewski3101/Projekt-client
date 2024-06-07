<template>
    <div>
      <v-icon
        small
        class="mr-2"
        @click="editItem"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem"
      >
        mdi-delete
      </v-icon>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      editItem() {
        this.$emit('edit-item', this.item);
      },
      deleteItem() {
        this.$emit('delete-item', this.item);
      }
    }
  }
  </script>
  