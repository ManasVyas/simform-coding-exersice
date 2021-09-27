import * as types from "./actionTypes";
import * as formApi from "../apis/formApis";

export const loadFormsSuccess = (forms) => {
  return {
    type: types.LOAD_FORMS,
    forms,
  };
};

export const addFormSuccess = (form) => {
  return {
    type: types.ADD_FORM,
    form,
  };
};

export const loadForms = () => {
  return async (dispatch) => {
    try {
      const forms = await formApi.loadForms();
      dispatch(loadFormsSuccess(forms));
      return forms;
    } catch (error) {
      return error;
    }
  };
};

export const addForm = (formDetails) => {
  return async (dispatch) => {
    try {
      const form = await formApi.addForm(formDetails);
      dispatch(addFormSuccess(form));
      return form;
    } catch (error) {
      return error;
    }
  };
};
