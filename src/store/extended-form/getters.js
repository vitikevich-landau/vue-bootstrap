import size from "lodash/size";
import groupBy from "lodash/groupBy";

export default {
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
    && state.form.company
    && state.form.name
    && state.form.message
    && state.form.module
    && state.form.curator,
    companies: state => Object.keys(state.groupedByTitleData),
    names: state => [...new Set(state.data.map(v => v.name))],
    modules: (state, getters) => [...new Set(state.groupedByTitleData[getters.company]?.map(v => v.module))],
    curators: (state, getters) => {
    const modules = [...new Set(state.groupedByTitleData[getters.company])];
    const groupedByModule = groupBy(modules, v => v.module);
    return [...new Set(groupedByModule[getters.module]?.map(v => v.curator))];
  },
};
