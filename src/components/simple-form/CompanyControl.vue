<template>
  <!--  Company  -->
  <b-form-group
      v-if="verified"
      id="company_group"
      :disabled="sending"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Организация:
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
    name: "CompanyControl",
    store,
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'verified',
        'sending',
        'companies',
        'company',
        'success'
      ]),
      company_: {
        get () {
          return this.company;
        },
        set(v) {
          this.setCompany(v);
        },
      }
    },
    methods: {
      ...mapMutations([
        'setCompany'
      ])
    }
  }
</script>

<style scoped>

</style>
