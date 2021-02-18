<template>
  <b-form-group
      id="module_group"
      :disabled="disabled"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      <slot></slot>
    </template>
    <b-form-select
        id="module"
        v-model.trim="module_"
        :options="modules"
        :class="validateClasses"
    ></b-form-select>
  </b-form-group>
</template>

<script>
  export default {
    name: "ModuleControl",
    props: {
      disabled: Boolean,
      modules: Array,
      module: String,
      validateClasses: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      module_: {
        get() {
          return this.module;
        },
        set(v) {
          this.$emit('onChangeModule', v);
        },
      }
    },
  }
</script>

<style scoped>

</style>
