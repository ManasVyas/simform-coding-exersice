const pool = require("../config/database");

const getAllForms = async (req, res, next) => {
  try {
    const data = await pool.query(
      `SELECT form_id AS "formId", form_data AS formData, TO_CHAR(created_at :: DATE, 'dd-mm-yyyy') AS createdAt FROM form ORDER BY form_id DESC`
    );
    res.status(200).json({ status: "success", data: data.rows });
  } catch (error) {
    next(error);
  }
};

const getFormByFormId = async (req, res, next) => {
  try {
    const data = await pool.query(
      `SELECT form_id AS "formId", form_data AS formData, TO_CHAR(created_at :: DATE, 'dd-mm-yyyy') AS createdAt FROM form WHERE form_id = $1`,
      [req, params, id]
    );
    res.status(200).json({ status: "success", data: data.rows });
  } catch (error) {
    next(error);
  }
};

const createForm = async (req, res, next) => {
  try {
    const data = await pool.query(
      `INSERT INTO form (form_data) VALUES ($1) RETURNING form_id AS "formId", form_data AS formData, created_at AS createdAt`,
      [req.body]
    );
    res.status(201).json({ status: "success", data: data.rows });
  } catch (error) {
    next(error);
  }
};

const formController = {
  getAllForms,
  createForm,
  getFormByFormId,
};

module.exports = formController;
