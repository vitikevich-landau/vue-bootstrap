<template>
  <b-form-group
      id="company_group"
      :disabled="disabled"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      <slot></slot>
    </template>
    <b-form-select
        id="company"
        @input="$emit('onChangeCompany', $event)"
        :value="company"
        :options="companies"
        :class="validateClasses"
        :state="controlState"
    ></b-form-select>
  </b-form-group>
</template>

<script>
  export default {
    name: "CompanyControl",
    props: {
      disabled: Boolean,
      companies: Array,
      company: String,
      validateClasses: {
        type: Object,
        default: () => ({})
      },
      controlState: {
        type: [Boolean, Object],
        default: null
      },
      success: [Boolean, Object]
    },
    computed: {
      company_: {
        get() {
          return this.company
        },
        set(v) {
          this.$emit('onChangeCompany', v);
        }
      }
    }
  }
</script>

<style scoped>

</style>
