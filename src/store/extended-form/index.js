import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line no-unused-vars
import groupBy from 'lodash/groupBy';
import size from 'lodash/size';

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
      module: '',
      curator: ''

    },
    /***
     *  Данные о пользователе, после прохождения верификации
     * */
    data: [],
    /***
     *
     * */
    groupedByTitleData: [],
    /***
     *  Индикатор заполнения номера телефона
     * */
    phoneFilled: false,
    // companyFilled: false,
    // nameFilled: false,
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
    formData: state => state.form,
    phone: state => state.form.phone,
    company: state => state.form.company,
    name: state => state.form.name,
    message: state => state.form.message,
    module: state => state.form.module,
    curator: state => state.form.curator,
    success: state => state.success,
    sending: state => state.sending,
    data: state => state.data,
    groupedByTitleData: state => state.groupedByTitleData,
    verified: state => !!size(state.data),
    phoneFilled: state => state.phoneFilled,
    companyFilled: state => state.companyFilled,
    formCompleted: state => state.phoneFilled
      && state.form.name.length > 1
      && state.form.message.length > 1,
    companies: state => Object.keys(state.groupedByTitleData),
    names: state => [...new Set(state.data.map(v => v.name))],
    modules: (state, getters) => [...new Set(state.groupedByTitleData[getters.company]?.map(v => v.module))],
    curators: (state, getters) => {
      const modules = [...new Set(state.groupedByTitleData[getters.company])];
      const groupedByModule = groupBy(modules, v => v.module);
      return [...new Set(groupedByModule[getters.module]?.map(v => v.curator))];
    },
  },
  mutations: {
    setPhone: (state, phone) => state.form.phone = phone,
    setCompany: (state, company) => state.form.company = company,
    setName: (state, name) => state.form.name = name,
    setMessage: (state, message) => state.form.message = message,
    setModule: (state, module) => state.form.module = module,
    setCurator: (state, curator) => state.form.curator = curator,

    setData: (state, data) => state.data = data,
    setGroupedByTitleData: (state, data) => state.groupedByTitleData = groupBy(data, t => t.title),

    setPhoneFilled: (state, flag) => state.phoneFilled = flag,
    setCompanyFilled: (state, flag) => state.companyFilled = flag,
    setSuccess: (state, flag) => state.success = flag,
    setSending: (state, flag) => state.sending = flag,
    dropWithOutPhone: state => {
      state.form.company = '';
      state.form.name = '';
      state.form.message = '';
      state.form.module = '';
      state.form.curator = '';

      state.success = null;
      state.data = [];
      state.groupedByTitleData = [];
      // state.phoneFilled = false;
      state.companyFilled = false;
    },
    dropStore: ({commit}) => {
      commit('setPhone', '');
      commit('dropWithOutPhone');

    },
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

      // console.log(data.length);

      if (data.length) {
        commit('setData', data);
        commit('setGroupedByTitleData', data);

        /***
         *  Заполнение организации
         * */
        if (getters.companies.length === 1) {

          commit('setCompanyFilled', true);
          commit('setCompany', getters.companies[0]);
        }

        /***
         *  Заполнение имени
         * */
        if (getters.names.length === 1) {
          commit('setName', getters.names[0]);
        }

      } else {
        commit('dropWithOutPhone', false);

      }


    }
  },
});
