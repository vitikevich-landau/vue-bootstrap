<template>
  <!-- Текст обращения -->
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
        :disabled="sending"
    ></b-form-textarea>
  </b-form-group>
</template>

<script>
  import {store} from '../../store/simple-form';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "MessageControl",
    store,
    data() {
      return {
        max: 1000
      }
    },
    computed: {
      ...mapGetters([
        'message',
        'sending',
        'success'
      ]),
      message_: {
        get() { return this.message; },
        set(v) { this.setMessage(v); }
      }
    },
    methods: {
      ...mapMutations(['setMessage'])
    }
  }
</script>

<style scoped>

</style>
