<template>
    <v-dialog v-model="visible" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">{{ $t('app.sureDelete') }}</v-card-title>
        <v-card-text v-if="deleteWarning">{{ deleteWarning }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            {{ $t('app.cancel') }}
          </v-btn>
          <v-btn color="red" text @click="confirm">
            {{ $t('app.delete') }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      deleteWarning: {
        type: String,
        default: '',
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
      confirm() {
        this.$emit('confirm');
      },
    },
  };
  </script>
  