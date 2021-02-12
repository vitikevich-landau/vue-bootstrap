<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <PhoneControl
          @hideToasts="hideToasts"
          @showErrorToast="showErrorToast"/>
      <CompanyControl v-if="verified"/>
      <NameControl v-if="company"/>
      <ModuleControl v-if="name && company"/>
      <CuratorsControl v-if="module && name"/>
      <MessageControl v-if="name && curator"/>
      <SubmitButton v-if="false"/>
    </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ formData }}</pre>
<!--      <pre class="m-0">{{ verifyingData }}</pre>-->
    </b-card>
  </div>
</template>

<script>
  import delay from "../../lib/delay";
  import {store} from '../../store/extended-form';
  import {mapGetters, mapMutations} from 'vuex';
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
        'companyFilled',
        'company',
        'name',
        'module',
        'curator'
      ]),
    },
    methods: {
      ...mapMutations([
        'dropStore',
        'setSuccess',
        'setSending'
      ]),
      hideToasts() {
        this.$bvToast.hide();
      },
      showSuccessToast(/*msg*/) {
        this.makeToast('success', 'Успех!', 'Ваше сообщение отправлено...');
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

          /***
           *  Передача только данных SimpleForm на сервер
           *      form: {
           *         phone: '',
           *         company: '',
           *         name: '',
           *         message: ''
           *       },
           *
           * */
          const {data} = await delay();

          /***
           *  After send
           * */
          console.log(data);

          /***
           *  Зыакрываем, если были открыты
           * */
          this.$bvToast.hide();
          this.showSuccessToast();

          this.dropStore();

          this.setSuccess(null);
        } catch (e) {

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
