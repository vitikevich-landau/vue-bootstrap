<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <PhoneControl />
      <NameControl
          :disabled="sending"
          :names="names"
          :name="name"
          :control-state="success"
          @onChangeName="setName"
      />
      <CompanyControl
          v-if="verified"
          :disabled="sending"
          :companies="companies"
          :company="company"
          :control-state="success"
      >
        <template>
          Организация (выбрать из списка):
          <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
          </span>
        </template>
      </CompanyControl>
      <MessageControl
          :disabled="sending"
          :message="message"
          @onChangeMessage="setMessage"
      />
      <SubmitButton
          :switch-button="!sending"
          :disabled="!formCompleted"
      />
    </b-form>
    <pre>{{formData}}</pre>
  </div>
</template>

<script>
  import axios from 'axios';
  import {store} from '../store/simple-form';
  import {mapGetters, mapMutations} from 'vuex';
  import NameControl from "./NameControl";
  import PhoneControl from "./PhoneControlSimple";
  import CompanyControl from "./CompanyControl";
  import MessageControl from "./MessageControl";
  import SubmitButton from "./SubmitButton";
  // import delay from "../lib/delay";

  export default {
    name: "SimpleForm",
    store,
    components: {
      PhoneControl,
      NameControl,
      CompanyControl,
      MessageControl,
      SubmitButton
    },
    computed: {
      ...mapGetters([
        'sending',
        'names',
        'name',
        'success',
        'formData',
        'phone',
        'phoneFilled',
        'verified',
        'company',
        'companies',
        'message',
        'formCompleted',
      ])
    },
    methods: {
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
          // console.log(data);

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
      ...mapMutations([
        'setName',
        'setPhone',
        'setPhoneFilled',
        'setSuccess',
        'setMessage',
        'setSending',
        'resetForm'
      ]),
    }
  }
</script>

<style scoped>

</style>
