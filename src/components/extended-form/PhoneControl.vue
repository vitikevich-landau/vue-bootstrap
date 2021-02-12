<template>
  <!--  Phone  -->
  <b-form-group
      id="phone_group"
      label-class="font-weight-bold"
      :disabled="sending"
  >
    <template v-slot:label>
      Номер телефона:
      <span :style="{fontSize: '18px'}" class="text-danger">
            <strong>*</strong>
          </span>
    </template>
    <b-input-group>
      <!-- Show while data load -->
      <template #append v-if="verifying">
        <b-input-group-text>
          <b-icon-arrow-repeat animation="spin-reverse"></b-icon-arrow-repeat>
        </b-input-group-text>
      </template>

      <b-form-input
          id="phone"
          @input="onInputPhone"
          :value="phone"
          type="text"
          autocomplete="off"
          placeholder="+7 (___) ___ ____"
          v-mask="'+7 (###) ### ####'"
          :state="success"
      ></b-form-input>
    </b-input-group>
  </b-form-group>
</template>

<script>
  import {mask} from 'vue-the-mask';
  import {BIconArrowRepeat} from 'bootstrap-vue';
  import {store} from '../../store/extended-form';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "PhoneControl",
    store,
    directives: {mask},
    components: {
      BIconArrowRepeat
    },
    data() {
      return {
        previousPhone: null,
        /***
         *  Request cancel
         * */
        controller: null,
        /***
         *  Show input preloader
         * */
        verifying: false
      }
    },
    computed: {
      ...mapGetters([
        'phone',
        'phoneFilled',
        'formCompleted',
        'success',
        'sending',
        'verified',
        'data',
        'companies',
        'names',
        'groupedByTitleData',
        'company'
      ])
    },
    methods: {
      ...mapMutations([
        'setPhone',
        'setPhoneFilled',
        'setSuccess',
        'setCompany',
        'setName',
        'dropWithOutPhone'
      ]),
      ...mapActions([
        'verifyUser'
      ]),
      onInputPhone(v) {
        this.setPhone(v);

        /***
         *
         *   Последний символ в запросе должен быть цифрой
         * */
        if (v.length === 17 && /[0-9]/.test(v[v.length - 1])) {
          /***
           *  Если телефон заполнен и предыдущее значение не равно текущему
           * */
          if (!this.phoneFilled || this.previousPhone !== v) {
            this.dropWithOutPhone();
            this.previousPhone = v;

            // console.log(`v: ${v}, previousPhone: ${this.previousPhone}`);

            this.verifyPhone(v);
          }

          this.setPhoneFilled(true);
        } else if (v.length < 17) {

          this.dropWithOutPhone();
          this.setPhoneFilled(false);
          this.setSuccess(null);
        }

        // console.log(v, v.length, this.phoneFilled);

      },
      async verifyPhone(phone) {
        /***
         *  Cancel previous request
         * */
        if (this.controller) {
          this.controller.abort();
        }

        /***
         *  Send request to server
         */
        console.log('send request to server...');

        this.controller = new AbortController();
        const {signal} = this.controller;

        try {
          /***
           *  Before fetch
           * */
          this.verifying = true;
          this.setSuccess(null);


          await this.verifyUser({signal, phone});

          // console.log(this.data);
          // console.log(this.companies);
          // console.log(this.groupedByTitleData[this.company]);
          // console.log(this.names);

          /***
           *  Зыакрываем, если были открыты
           * */
          this.$emit('hideToasts');

          if(this.verified) {
            this.setSuccess(true);
          } else {
            this.setSuccess(null);
          }

        } catch (e) {
          if (e.name === 'AbortError') {
            console.log('Request cancelled...');
          } else {
            // console.log(e);
            /***
             *  Зыакрываем, если были открыты
             * */
            this.$emit('hideToasts');

            this.$emit('showErrorToast');
            this.setSuccess(false);
          }

        } finally {
          console.log('finally');

          this.verifying = false;
        }
      },
    }
  }
</script>

<style scoped>

</style>
