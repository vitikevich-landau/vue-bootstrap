<template>
  <b-navbar class="mb-4" type="dark" variant="primary">
    <a href="/"><img src="../assets/logo_parus1.png" alt=""></a>
    <b-navbar-brand class="ml-2">FORMS.PARUSALTAI.RU</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-form-checkbox
            :value="switcher"
            @input="$emit('onSwitch')"
            id="www"
            button-variant="outline-secondary"
            switch
            size="lg">
        </b-form-checkbox>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

  export default {
    name: "NavBar",
    props: {
      switcher: Boolean
    },
  }
</script>

<style scoped>
  .navbar-brand {
    font-size: 1rem !important;
  }

  .custom-switch.b-custom-control-lg,
  .custom-control-label::before {
    user-select: none !important;
  }
</style>
