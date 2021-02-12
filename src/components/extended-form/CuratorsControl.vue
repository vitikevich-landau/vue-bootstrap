<template>
  <b-form-group
      id="curator_group"
      :disabled="sending"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Куратор:
      <span :style="{fontSize: '18px'}" class="text-danger">
          <strong>*</strong>
      </span>
    </template>
    <b-form-select
        id="curator"
        v-model="curator_"
        :options="curators"
    ></b-form-select>
  </b-form-group>
</template>

<script>
  import {store} from '../../store/extended-form';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    created() {
      // console.log(this.curators);
    },
    name: "CuratorsControl",
    store,
    data() {
      return {};
    },
    computed: {
      ...mapGetters([
        'verified',
        'sending',
        'success',
        'curators',
        'curator'
      ]),
      curator_: {
        get() {
          return this.curator;
        },
        set(v) {
          this.setCurator(v);
        },
      }
    },
    methods: {
      ...mapMutations([
        'setCurator'
      ]),
    }
  }
</script>

<style scoped>

</style>
