<template>
  <b-form-group
      v-if="verified"
      id="module_group"
      :disabled="sending"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Модуль:
      <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
      </span>
    </template>
    <b-form-select
        id="module"
        v-model.trim="module_"
        :options="modules"
        :class="{'is-valid': module}"
    ></b-form-select>
  </b-form-group>
</template>

<script>
  import {store} from '../../store/extended-form';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "ModuleControl",
    store,
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'verified',
        'sending',
        'success',
        'module',
        'modules'
      ]),
      module_: {
        get() {
          return this.module;
        },
        set(v) {
          this.setCurator('');
          this.setModule(v);
        },
      }
    },
    methods: {
      ...mapMutations([
        'setModule',
        'setCurator'
      ])
    },
  }
</script>

<style scoped>

</style>
