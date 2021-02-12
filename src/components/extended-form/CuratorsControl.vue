<template>
  <b-form-group
      v-if="verified"
      id="company_group"
      :disabled="sending"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Организация (выбрать из списка):
    </template>
    <b-form-select
        id="company"
        v-model="company_"
        :options="companies"
        :state="success"
    ></b-form-select>
  </b-form-group>
</template>

<script>
  import {store} from '../../store';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "CuratorsControl",
    store,
    data () {},
    computed: {
      ...mapGetters([
        'verified',
        'sending',
        'success'
      ]),
    },
    methods: {}
  }
</script>

<style scoped>

</style>
