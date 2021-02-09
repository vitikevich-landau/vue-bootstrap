<template>
  <div id="app">
    <NavBar></NavBar>
    <MainContainer></MainContainer>

  </div>
</template>

<script>
  import NavBar from "./components/NavBar";
  import MainContainer from "./components/MainContainer";

  export default {
    name: 'App',
    components: {
      NavBar,
      MainContainer
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

  .custom-control-input:checked ~ .custom-control-label::before {
    /*background-color: #28a745 !important;*/
    border-color: white !important;
  }
</style>
