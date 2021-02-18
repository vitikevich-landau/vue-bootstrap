export default {
  /***
   *  Data to send to the server
   * */
  form: {
    phone: '',
    company: '',
    name: '',
    message: ''
  },
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
};
