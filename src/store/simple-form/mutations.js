export default {
  setPhone: (state, phone) => state.form.phone = phone,
    setCompany: (state, company) => state.form.company = company,
    setName: (state, name) => state.form.name = name,
    setMessage: (state, message) => state.form.message = message,
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
};
