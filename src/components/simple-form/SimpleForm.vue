<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <PhoneControl
          @hideToasts="hideToasts"
          @showErrorToast="showErrorToast"/>
      <CompanyControl/>
      <NameControl/>
      <MessageControl/>
      <SubmitButton/>
    </b-form>

    <!--    <b-card class="mt-3" header="Form Data Result">-->
    <!--      <pre class="m-0">{{ formData }}</pre>-->
    <!--      &lt;!&ndash;          <pre class="m-0">{{ verifyingData }}</pre>&ndash;&gt;-->
    <!--    </b-card>-->
  </div>
</template>

<script>
  const axios = require('axios');
  // import delay from "../../lib/delay";
  import {store} from '../../store/simple-form';
  import {mapGetters, mapMutations} from 'vuex';
  import PhoneControl from "./PhoneControl";
  import CompanyControl from "./CompanyControl";
  import NameControl from "./NameControl";
  import MessageControl from "./MessageControl";
  import SubmitButton from "./SubmitButton";


  export default {
    name: "SimpleForm",
    components: {
      PhoneControl,
      CompanyControl,
      NameControl,
      MessageControl,
      SubmitButton,
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
        'verifyingData'
      ]),
    },
    methods: {
      ...mapMutations([
        'resetForm',
        'setSuccess',
        'setSending'
      ]),
      recaptchaToken() {
        return new Promise((resolve) => {
          // eslint-disable-next-line no-undef
          grecaptcha.ready(async () => {
            // eslint-disable-next-line no-undef
            const token = await grecaptcha.execute("6Lc4dfwZAAAAAB2wHs5hmA9SCTxuC6oThkc2-anR");
            resolve(token);
          });
        });
      },
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
      onSubmit: async function () {
        /***
         *  before send
         * */
        this.setSending(true);

        try {
          // const {data} = await delay();
          const {phone, company, name, message: text} = this.formData;
          // const token = await this.recaptchaToken();

          await axios.post('http://192.168.1.200:8185/api/send', {
            phone,
            company,
            name,
            text,
            // token
          });

          /***
           *  After send
           * */
          /***
           *  Зыакрываем, если были открыты
           * */
          this.$bvToast.hide();
          this.showSuccessToast();

          this.resetForm();

          this.setSuccess(null);
        } catch (e) {
          console.log('error: ', e);
          /***
           *  Зыакрываем, если были открыты
           * */
          this.$bvToast.hide();
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

</style>
