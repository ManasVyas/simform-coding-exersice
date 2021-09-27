import axios from "axios";
import config from "../config.json";

export const loadForms = async () => {
  try {
    const response = await axios.get(`${config.Backend_URL}form`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addForm = async (formDetails) => {
  try {
    const response = await axios.post(
      `${config.Backend_URL}form/add`,
      formDetails
    );
    return response;
  } catch (error) {
    return error;
  }
};
