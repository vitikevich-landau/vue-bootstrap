<template>
  <b-form-group>
    <b-button
        v-if="switchButton"
        type="submit"
        variant="primary"
        :disabled="disabled"
        @click="$emit('onSend')"
    >
      Отправить
    </b-button>
    <b-button
        v-else
        variant="primary"
        type="button"
        disabled
    >
      <b-spinner small type="grow"></b-spinner>
      Отправка...
    </b-button>
  </b-form-group>
</template>

<script>
  export default {
    name: "SubmitButton",
    props: {
      switchButton: Boolean,
      disabled: Boolean
    }
  }
</script>

<style scoped>

</style>
