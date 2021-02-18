<template>
  <b-form-group
      label-for="textarea-formatter"
      label-class="font-weight-bold"
  >
    <template v-slot:label>
      Текст обращения
      <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
          </span>
    </template>
    <template v-slot:description>
      <span :style="{float: 'right'}">{{message.length}} / {{max}}</span>
    </template>
    <b-form-textarea
        id="textarea-rows"
        class="mb-1"
        rows="6"
        v-model.trim="message_"
        :maxlength="max"
        :disabled="disabled"
        :class="validateClasses"
    ></b-form-textarea>
  </b-form-group>
</template>

<script>
  export default {
    name: "MessageControl",
    props: {
      disabled: Boolean,
      message: String,
      validateClasses: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        max: 1000
      }
    },
    computed: {
      message_: {
        get() {
          return this.message;
        },
        set(v) {
          this.$emit('onChangeMessage', v);
        }
      }
    }
  }
</script>

<style scoped>

</style>
