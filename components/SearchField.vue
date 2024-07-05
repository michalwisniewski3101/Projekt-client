<template>
  <v-row>
    <v-text-field
      v-model="internalSearch1"
      :label="$t('app.search')"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      flat
      hide-details
      single-line
      clearable
    ></v-text-field>
    <v-divider class="mx-4" inset vertical v-if="showSelect1"></v-divider>
    <v-select
      v-if="showSelect1"
      v-model="internalSearch2"
      :items="serverNames"
      item-text="name"
      item-value="name"
      :label="$t('app.serverName')"
      clearable
      flat
      hide-details
      single-line
      ></v-select>
    <v-divider class="mx-4" inset vertical v-if="showSelect2"></v-divider>
    <v-select
      v-if="showSelect2"
      v-model="internalSearch3"
      :items="appNames"
      item-text="name"
      item-value="name"
      :label="$t('app.appName')"
      clearable
      flat
      hide-details
      single-line
    ></v-select>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    value: {
      type: Object,
      default: () => ({ search1: '', search2: '', search3: '' }),
    },
    showSelect1: {
      type: Boolean,
      default: false,
    },
    showSelect2: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      internalSearch1: this.value.search1,
      internalSearch2: this.value.search2,
      internalSearch3: this.value.search3,
    };
  },
  watch: {
    internalSearch1(newVal) {
      this.updateValue();
    },
    internalSearch2(newVal) {
      this.updateValue();
    },
    internalSearch3(newVal) {
      this.updateValue();
    },
    value: {
      handler(newVal) {
        this.internalSearch1 = newVal.search1;
        this.internalSearch2 = newVal.search2;
        this.internalSearch3 = newVal.search3;
      },
      deep: true,
    },
  },
  computed: {
    ...mapState('data', ['servers', 'apps','appNames', 'serverNames']),


  },
  methods: {
    updateValue() {
      this.$emit('input', {
        search1: this.internalSearch1,
        search2: this.internalSearch2,
        search3: this.internalSearch3,
      });
    },
  },
};
</script>
