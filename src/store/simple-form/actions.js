export default {
  verifyUser: async (
    {commit, getters},
    {signal, phone}
  ) => {
    const response = await fetch(
      `http://192.168.1.200:8185/api/verify-phone?phone=${encodeURIComponent(phone)}`,
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
    } else {
      commit('setVerifyingData', [])
    }


  }
};
