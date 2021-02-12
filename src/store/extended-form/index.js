import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    /***
     *  Data to send to the server
     * */
    form: {
      phone: '',
      company: '',
      name: '',
      message: '',
      /***
       *  ExtendedForm
       *  Показываются после того, как юзер был верифицирован
       * */
      section: '',
      curator: ''

    },
    /***
     *  Mock
     * */
    sections: [
      'Прочее',
      'Бухгалтерский учёт',
      'Кадры и штатное расписание',
      'Расчёт заработной платы',
      'Управлние деловыми процессами',
      'Учёт продуктов питания',
      'Централизованное материально-техническое обслуживание',
    ],
    /***
     *  Данные о пользователе, после прохождения верификации
     * */
    verifyingData: [],
    /***
     *  Индикатор заполнения номера телефона
     * */
    phoneFilled: false,
    /***
     *  Для подсветки валидации
     *  Используется всеми компонентами
     * */
    success: null,
    /***
     *  Show button preloader
     *  Disable inputs while sending
     * */
    sending: false
  },
  getters: {
    /***
     *  Mock
     * */
    sections: state => state.sections,

    formData: state => state.form,
    phone: state => state.form.phone,
    company: state => state.form.company,
    name: state => state.form.name,
    message: state => state.form.message,
    section: state => state.form.section,
    curator: state => state.form.curator,
    success: state => state.success,
    sending: state => state.sending,
    verifyingData: state => state.verifyingData,
    verified: state => !!state.verifyingData.length,
    phoneFilled: state => state.phoneFilled,
    formCompleted: state => state.phoneFilled
      && state.form.name.length > 1
      && state.form.message.length > 1,
    companies: state => [...new Set(state.verifyingData.map(v => v.title))],
    names: state => [...new Set(state.verifyingData.map(v => v.name))],
  },
  mutations: {
    setPhone: (state, phone) => state.form.phone = phone,
    setCompany: (state, company) => state.form.company = company,
    setName: (state, name) => state.form.name = name,
    setMessage: (state, message) => state.form.message = message,
    setSection: (state, section) => state.form.section = section,
    setCurator: (state, curator) => state.form.curator = curator,
    setVerifyingData: (state, data) => state.verifyingData = data,
    setPhoneFilled: (state, flag) => state.phoneFilled = flag,
    setSuccess: (state, flag) => state.success = flag,
    setSending: (state, flag) => state.sending = flag,
    resetForm: state => {
      state.form.phone = '';
      state.form.company = '';
      state.form.name = '';
      state.form.message = '';

      state.success = null;
      state.verifyingData = [];
      state.phoneFilled = false;
    }
  },
  actions: {
    verifyUser: async (
      {commit, getters},
      {signal, phone}
    ) => {
      const response = await fetch(
        `http://192.168.1.132:8185/api/verify-phone?phone=${encodeURIComponent(phone)}`,
        {signal}
      );
      const data = await response.json();

      if (data.length) {
        commit('setVerifyingData', data);

        /***
         *  Присваиваем значение имя/организации, первым значением из списка
         * */
        commit('setCompany', getters.companies[0]);
        commit('setName', getters.names[0]);
        // commit('setSection', getters.sections[0]);
      } else {
        commit('setVerifyingData', [])
      }


    }
  },
});
