<template>
  <div>
    <b-button
        v-if="!sending"
        type="submit"
        variant="primary"
        :disabled="!formCompleted"
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
  import {store} from '../../store/simple-form';
  import {mapGetters} from 'vuex';

  export default {
    name: "SubmitButton",
    store,
    data() {
      return {}
    },
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
