<template>
  <div>
    <b-form @submit="onSubmit" :disabled="true">
      <!--  Phone  -->
      <b-form-group
          id="phone_group"
          label-class="font-weight-bold"
          :disabled="sending"
      >
        <template v-slot:label>
          Номер телефона
          <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
          </span>
        </template>
        <b-input-group>
          <!-- Show while data load -->
          <template #append v-if="verify.verifying">
            <b-input-group-text>
              <b-icon icon="arrow-repeat" animation="spin"></b-icon>
            </b-input-group-text>
          </template>

          <b-form-input
              id="phone"
              @input="onInputPhone"
              :value="form.phone"
              type="text"
              autocomplete="off"
              placeholder="+7 (___) ___ ____"
              v-mask="'+7 (###) ### ####'"
              :state="success"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
      <!--  Company  -->
      <b-form-group
          v-if="isVerified"
          id="company_group"
          :disabled="sending"
          label-class="font-weight-bold"
      >
        <template v-slot:label>
          Организация:
        </template>
        <b-form-select
            id="company"
            v-model="form.company"
            :options="companies"
            :state="success"
        ></b-form-select>
      </b-form-group>

      <!-- Name -->
      <b-form-group
          id="name_group"
          label="Имя:"
          :disabled="sending"
          label-class="font-weight-bold"
      >
        <template v-slot:label>
          Имя:
          <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
          </span>
        </template>
        <b-input-group>
          <!-- Show if items more > 1 -->
          <template #append v-if="names.length > 1">
            <b-dropdown ref="dropdown" variant="outline-success">
              <b-dropdown-item
                  v-for="(item, i) in names"
                  :key="`${item}-${i}`"
                  :data-value="item"
                  @click="form.name = $event.target.innerText"
              >
                {{item}}
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <b-form-input id="name" :state="success" v-model.trim="form.name" :maxlength="nameMaxLen"
                        autocomplete="off"></b-form-input>
        </b-input-group>
      </b-form-group>

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
          <span :style="{float: 'right'}">{{form.message.length}} / {{messageMaxLen}}</span>
        </template>
        <b-form-textarea
            id="textarea-rows"
            class="mb-1"
            rows="6"
            v-model.trim="form.message"
            :maxlength="messageMaxLen"
            :disabled="sending"
        ></b-form-textarea>
      </b-form-group>

      <b-button
          v-if="!sending"
          type="submit"
          variant="primary"
          :disabled="!formValid"
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
    </b-form>

    <!--    <b-card class="mt-3" header="Form Data Result">-->
    <!--      <pre class="m-0">{{ form }}</pre>-->
    <!--      <pre class="m-0">{{ verify }}</pre>-->
    <!--    </b-card>-->
  </div>
</template>

<script>
  import {mask} from 'vue-the-mask';
  import delay from "../lib/delay";

  export default {
    directives: {mask},
    data() {
      return {
        /***
         *  Данные для отправки на сервер
         * */
        form: {
          phone: '',
          company: '',
          name: '',
          message: ''
        },
        /***
         *  Поля для верификации
         * */
        verify: {
          /***
           *  Данные с сервера, после верификации
           * */
          data: [],
          phoneFilled: false,
          previousPhone: '',
          /***
           *  Request cancel
           * */
          controller: null,
          /***
           *  Show input preloader
           * */
          verifying: false,
        },
        /***
         *  Show button preloader
         * */
        sending: false,
        /***
         *  Используется для присваивания классов полям
         * */
        success: null,

        nameMaxLen: 60,
        messageMaxLen: 1000,
      }
    },
    computed: {
      formValid() {
        return this.verify.phoneFilled
          && this.form.name
          && this.form.message;
      },
      isVerified() {
        return !!this.verifyData.length;
      },
      companies() {
        return this.verifyData.map(v => v.title);
      },
      names() {
        /***
         *  Убираем дубриующиеся имена
         * */
        return [...new Set(this.verifyData.map(v => v.name))];
      },
      verifyData() {
        return this.verify.data;
      }
    },
    methods: {
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
      onInputPhone(v) {
        this.form.phone = v;
        /***
         *
         *   Последний символ в запросе должен быть цифрой
         * */
        if (v.length === 17 && /[0-9]/.test(v[v.length - 1])) {


          /***
           *  Если телефон заполнен и предыдущее значение не равно текущему
           * */
          if (!this.verify.phoneFilled || this.verify.previousPhone !== v) {
            this.verify.previousPhone = v;

            console.log(`v: ${v}, previousPhone: ${this.verify.previousPhone}`);

            this.verifyPhone(v);
          }

          this.verify.phoneFilled = true;
        } else if (v.length < 17) {

          this.verify.phoneFilled = false;
          this.success = null;
        }

        // console.log(v, v.length, this.verify.phoneFilled);
      },
      async verifyPhone(phone) {
        /***
         *  Cancel previous request
         * */
        if (this.verify.controller) {
          this.verify.controller.abort();
        }

        /***
         *  Send request to server
         */
        console.log('send request to server...');

        this.verify.controller = new AbortController();
        const {signal} = this.verify.controller;

        try {
          /***
           *  Before fetch
           * */
          this.verify.verifying = true;
          this.success = null;

          const response = await fetch(
            `http://192.168.1.132:8185/api/verify-phone?phone=${encodeURIComponent(phone)}`,
            {signal}
          );

          const data = await response.json();

          /***
           *  After fetch
           * */

          /***
           *  Зыакрываем, если были открыты
           * */
          this.$bvToast.hide();

          if (data.length) {
            this.verify.data = data;

            /***
             *  Присваиваем значение имя/организации, первым значением из списка
             * */
            this.form.company = this.companies[0];
            this.form.name = this.names[0];
            this.success = true;
          } else {

            this.verify.data = [];
            this.success = null;
          }

        } catch (e) {
          if (e.name === 'AbortError') {
            console.log('Request cancelled...');
          } else {

            /***
             *  Зыакрываем, если были открыты
             * */
            this.$bvToast.hide();

            this.showErrorToast();
            this.success = false
          }

        } finally {
          console.log('finally');

          this.verify.verifying = false;
        }
      },
      async onSubmit(event) {
        event.preventDefault();

        /***
         *  before send
         * */
        this.sending = true;

        try {

          /***
           *  Send post request to server
           * */
          const data = await delay();

          /***
           *  After send
           * */
          console.log(data);

          /***
           *  Зыакрываем, если были открыты
           * */
          this.$bvToast.hide();
          this.showSuccessToast();

          this.resetForm();
        } catch (e) {

          /***
           *  Зыакрываем, если были открыты
           * */
          this.$bvToast.hide();
          this.showErrorToast();
        } finally {

          this.sending = false;
        }
      },
      resetForm() {
        /***
         *  Drop validation styles
         * */
        this.success = null;

        /***
         *  Drop form
         * */
        this.form.phone = '';
        this.form.company = '';
        this.form.name = '';
        this.form.message = '';

        /***
         *  Drop loaded data
         * */
        this.verify.data = [];

        // Trick to reset/clear native browser form validation state
        // this.$nextTick(() => {
        //   this.show = true
        // });
      },

    }
  }
</script>

<style scoped>
  /*.form-control:disabled, .form-control[readonly] {*/
  /*#company {*/
  /*  background-color: white !important;*/
  /*}*/
  .form-text .text-muted {
    text-align: right !important;
  }

</style>
