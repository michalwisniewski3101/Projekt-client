


<template>
    <div>
        <v-btn
            v-for="locale in this.$i18n.locales"
            :key="locale.code"
            :title="locale.switchText"
            @click="changeLocale(locale)"
        >
            {{ locale.code }}
        </v-btn>
      </div>
</template>

<script>
export default{
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocale(locale.code)
    },
  },
  
  
  }
</script>