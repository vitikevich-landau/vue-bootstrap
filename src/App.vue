<template>
  <div id="app">
    <b-navbar class="mb-4" type="dark" variant="primary">
      <b-navbar-brand href="#">FORMS.PARUSALTAI.RU</b-navbar-brand>

<!--      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-form-checkbox button-variant="outline-secondary" switch size="lg"></b-form-checkbox>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container class="justify-content-md-center">
      <b-row>
        <b-col cols="12">
          <SimpleForm></SimpleForm>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import SimpleForm from "@/components/SimpleForm";

  export default {
    name: 'App',
    components: {
      SimpleForm
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
  }

  .justify-content-md-center {
    max-width: 576px !important;
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    background-color: #28a745 !important;
  }
  .navbar-brand {
    font-size: 1rem !important;
  }
</style>
