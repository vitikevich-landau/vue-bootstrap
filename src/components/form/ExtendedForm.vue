<template>
  <div>
    <b-progress
        :value="progress"
        :max="6"
        :animated="true"
        :striped="true"
        class="mb-2"
        :variant="formCompleted && success !== false ? 'success' : success === false ? 'danger': ''"
    />
    <b-form @submit.prevent @onSend="submit">
      <PhoneControl
          @onServerError="showErrorToast"
      />
      <transition name="fade" mode="out-in">
        <CompanyControl
            v-if="verified"
            :disabled="sending"
            :companies="companies"
            :company="company"
            :validate-classes="{
          'is-valid': this.company,
          'is-invalid': this.success === false,
        }"
            @onChangeCompany="changeCompany"
        >
          <template>
            Организация (выбрать из списка):
            <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
          </span>
          </template>
        </CompanyControl>
      </transition>
      <transition name="fade" mode="out-in">
        <NameControl
            v-if="company"
            :disabled="sending"
            :names="names"
            :name="name"
            :validate-classes="{
          'is-valid': this.name,
          'is-invalid': this.success === false,
        }"
            @onChangeName="setName"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <ModuleControl
            v-if="name && company"
            :disabled="sending"
            :modules="modules"
            :module="module"
            :validate-classes="{
          'is-valid': module,
          'is-invalid': success === false
        }"
            @onChangeModule="changeModule"
        >
          <template>
            Модуль:
            <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
      </span>
          </template>
        </ModuleControl>
      </transition>
      <transition name="fade" mode="out-in">
        <CuratorsControl
            v-if="module && name"
            :disabled="sending"
            :curators="curators"
            :curator="curator"
            :validate-classes="{
          'is-valid': curator,
          'is-invalid': success === false,
        }"
            @onChangeCurator="setCurator"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <MessageControl
            v-if="name && curator"
            :disabled="sending"
            :message="message"
            :validate-classes="{
            'is-valid': message,
            'is-invalid': success === false,
          }"
            @onChangeMessage="setMessage"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <SubmitButton
            v-if="name && curator"
            :switch-button="!sending"
            :disabled="!formCompleted"
        />
      </transition>
<!--      <pre>{{formData}}</pre>-->
    </b-form>
  </div>
</template>

<script>
  import axios from 'axios';
  import {store} from '../../store/extended-form';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import PhoneControl from "./PhoneControlExtended";
  import NameControl from "./NameControl";
  import CompanyControl from "./CompanyControl";
  import ModuleControl from "./ModuleControl";
  import CuratorsControl from "./CuratorsControl";
  import MessageControl from "./MessageControl";
  import SubmitButton from "./SubmitButton";
  // import delay from "../lib/delay";

  export default {
    name: "ExtendedForm",
    store,
    components: {
      PhoneControl,
      NameControl,
      CompanyControl,
      ModuleControl,
      CuratorsControl,
      MessageControl,
      SubmitButton
    },
    computed: {
      progress() {
        return !!this.verified
          + !!this.company
          + !!this.name
          + !!this.module
          + !!this.curator
          + !!this.message;
      },
      ...mapGetters([
        'sending',
        'names',
        'name',
        'success',
        'formData',
        'verified',
        'companies',
        'company',
        'modules',
        'module',
        'curators',
        'curator',
        'message',
        'formCompleted'
      ])
    },
    methods: {
      async recaptchaToken() {
        await this.$recaptchaLoaded();

        return await this.$recaptcha('submit');
      },
      async submit() {
        /***
         *  before send
         * */
        this.setSending(true);

        try {
          // const {data} = await delay();
          // console.log(data);

          const {phone, company, name, message: text, module, curator} = this.formData;


          const token = await this.recaptchaToken();

          await axios.post('api/send', {
            phone,
            company,
            name,
            text,
            module,
            curator,
            token
          });

          /***
           *  After send
           * */
          /***
           *  Зыакрываем, если были открыты
           * */
          this.$bvToast.hide();
          this.showSuccessToast();

          this.dropStore();

          this.setSuccess(null);
        } catch (e) {
          // console.log('error: ', e);
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
      changeCompany(v) {
        this.setModule('');
        this.setCurator('');
        this.setCompany(v);
      },
      changeModule(v) {
        this.setCurator('');
        this.setModule(v);
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
      ...mapMutations([
        'setName',
        'setCompany',
        'setCurator',
        'setModule',
        'setMessage',
        'setSuccess',
        'setSending'
      ]),
      ...mapActions([
        'dropStore'
      ])
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
