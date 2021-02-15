<template>
  <div>
    <b-button
        v-if="!sending"
        type="submit"
        variant="primary"
        :disabled="!formCompleted"
        @click="$emit('onSubmit')"
    >
      Отправить
    </b-button>
    <b-button
        v-else
        variant="primary"
        type="button"
        disabled>
      <b-spinner small type="grow"></b-spinner>
      Отправка...
    </b-button>
  </div>
</template>

<script>
  import {store} from '../../store/extended-form';
  import {mapGetters} from 'vuex';

  export default {
    name: "SubmitButton",
    store,
    computed: {
      ...mapGetters([
        'sending',
        'formCompleted'
      ])
    }
  }
</script>

<style scoped>

</style>
