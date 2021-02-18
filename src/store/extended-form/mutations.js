import groupBy from "lodash/groupBy";

export default {
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
    state.companyFilled = false;
  },
};
