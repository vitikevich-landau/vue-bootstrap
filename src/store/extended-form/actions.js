export default {
  dropStore({commit}) {
    commit('setPhone');
    commit('setPhoneFilled');
    commit('dropWithOutPhone');
  },
  verifyUser: async (
    {commit, getters},
    {signal, phone}
  ) => {
    const response = await fetch(
      `api/verify-phone?phone=${encodeURIComponent(phone)}`,
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
};
