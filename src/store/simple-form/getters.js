export default {
  formData: state => state.form,
  phone: state => state.form.phone,
  company: state => state.form.company,
  name: state => state.form.name,
  message: state => state.form.message,
  success: state => state.success,
  sending: state => state.sending,
  verifyingData: state => state.verifyingData,
  verified: state => !!state.verifyingData.length,
  phoneFilled: state => state.phoneFilled,
  formCompleted: state => state.phoneFilled
    && state.form.name.length
    && state.form.message.length,
  companies: state => [...new Set(state.verifyingData.map(v => v.title))],
  names: state => [...new Set(state.verifyingData.map(v => v.name))],
};
