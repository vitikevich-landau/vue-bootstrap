<template>
  <b-navbar class="mb-4" type="dark" variant="primary">
    <img src="../assets/logo_parus1.png" alt="">
    <b-navbar-brand class="ml-2">FORMS.PARUSALTAI.RU</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-form-checkbox id="www" button-variant="outline-secondary" switch size="lg"></b-form-checkbox>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: "NavBar"
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
