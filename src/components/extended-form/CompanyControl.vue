<template>
  <!--  Company  -->
  <b-form-group
      id="company_group"
      :disabled="sending"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Организация:
      <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
      </span>
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
  import {store} from '../../store/extended-form';
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
        'success',
      ]),
      company_: {
        get () {
          return this.company;
        },
        set(v) {
          this.setCompany(v);
          this.setModule('');
          this.setCurator('');
        },
      },
    },
    methods: {
      ...mapMutations([
        'setCompany',
        'setModule',
        'setCurator',
      ])
    }
  }
</script>

<style scoped>

</style>
