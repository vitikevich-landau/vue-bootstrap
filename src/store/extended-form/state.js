export default   {
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
};
