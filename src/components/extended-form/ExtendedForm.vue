<template>
  <div>
    <!--   if completed  -->
    <!--    variant="success"-->
    <b-progress
        :value="progress"
        :max="6"
        :animated="true"
        :striped="true"
        class="mb-2"
        :variant="formCompleted ? 'success' : ''"
    ></b-progress>
    <b-form @submit.prevent>
      <PhoneControl
          @hideToasts="hideToasts"
          @showErrorToast="showErrorToast"/>
      <transition name="fade" mode="out-in">
        <CompanyControl v-if="verified"/>
      </transition>
      <transition name="fade" mode="out-in">
        <NameControl v-if="company"/>
      </transition>
      <transition name="fade" mode="out-in">
        <ModuleControl v-if="name && company"/>
      </transition>
      <transition name="fade" mode="out-in">
        <CuratorsControl v-if="module && name"/>
      </transition>
      <transition name="fade" mode="out-in">
        <MessageControl v-if="name && curator"/>
      </transition>
      <transition name="fade" mode="out-in">
        <SubmitButton @onSubmit="onSubmit" v-if="name && curator"/>
      </transition>
    </b-form>
    <!--    <b-card class="mt-3" header="Form Data Result">-->
    <!--      <pre class="m-0">{{ formData }}</pre>-->
    <!--      &lt;!&ndash;      <pre class="m-0">{{ verifyingData }}</pre>&ndash;&gt;-->
    <!--    </b-card>-->
  </div>
</template>

<script>
  const axios = require('axios');
  // import delay from "../../lib/delay";
  import {store} from '../../store/extended-form';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import PhoneControl from "./PhoneControl";
  import CompanyControl from "./CompanyControl";
  import NameControl from "./NameControl";
  import ModuleControl from "./ModuleControl";
  import CuratorsControl from "./CuratorsControl";
  import MessageControl from "./MessageControl";
  import SubmitButton from "./SubmitButton";

  export default {
    name: "SimpleForm",
    components: {
      PhoneControl,
      CompanyControl,
      NameControl,
      ModuleControl,
      CuratorsControl,
      MessageControl,
      SubmitButton
    },
    store,
    data() {
      return {
        sending: false,
      }
    },
    computed: {
      /***
       *  Dedug
       * */
      ...mapGetters([
        'formData',
        'verifyingData',
        'verified',
        'company',
        'name',
        'module',
        'curator',
        'message',
        'formCompleted'
      ]),
      progress() {
        return !!this.verified
          + !!this.company
          + !!this.name
          + !!this.module
          + !!this.curator
          + !!this.message;
      }
    },
    methods: {
      ...mapMutations([
        'setSuccess',
        'setSending'
      ]),
      ...mapActions([
        'dropStore'
      ]),
      hideToasts() {
        this.$bvToast.hide();
      },
      showSuccessToast(/*msg*/) {
        this.makeToast('success', 'Успех!', 'Ваше обращение отправлено...');
      },
      showErrorToast(/*msg*/) {
        this.makeToast('danger', 'Ошибка!', 'Ошибка соединения с сервером... Попробуйте чуть позже');
      },
      makeToast(variant, title, message) {
        this.$bvToast.toast(message, {
          toaster: 'b-toaster-top-center',
          title,
          variant: variant,
          solid: true,
          autoHideDelay: 17000
        });
      },
      async onSubmit() {
        /***
         *  before send
         * */
        this.setSending(true);

        try {
          // const {data} = await delay();
          const {phone, company, name, message: text, module, curator} = this.formData;

          await axios.post('http://192.168.1.200:8185/api/send', {
            phone,
            company,
            name,
            text,
            module,
            curator
          });

          /***
           *  After send
           * */
          /***
           *  Зыакрываем, если были открыты
           * */
          this.hideToasts();
          this.showSuccessToast();

          this.dropStore();

          this.setSuccess(null);

        } catch (e) {

          /***
           *  Зыакрываем, если были открыты
           * */
          this.hideToasts();
          this.showErrorToast();

          this.setSuccess(false);
        } finally {

          this.setSending(false);
        }
      },

    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-to
    /* .component-fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }
</style>
