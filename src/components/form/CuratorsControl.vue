<template>
  <b-form-group
      id="curator_group"
      :disabled="disabled"
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
        :class="validateClasses"
    ></b-form-select>
  </b-form-group>
</template>

<script>
  export default {
    name: "CuratorsControl",
    props: {
      disabled: Boolean,
      curators: Array,
      curator: String,
      validateClasses: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      curator_: {
        get() {
          return this.curator;
        },
        set(v) {
          this.$emit('onChangeCurator', v);
        },
      }
    }
  }
</script>

<style scoped>

</style>
