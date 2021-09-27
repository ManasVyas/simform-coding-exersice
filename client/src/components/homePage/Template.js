import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { connect } from "react-redux";
import { loadForms } from "../../redux/actions/formActions";
import formImage from "../../images/4912309.jpg";
import "./Template.css";

const Template = (props) => {
  const [forms, setForms] = useState([]);
  const history = useHistory();
  const createForm = () => {
    const id = uuid();
    history.push(`/form/${id}`);
  };

  const loadAllForms = async () => {
    try {
      const response = await props.loadForms();
      if (response && response.data && response.data.data) {
        setForms(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadAllForms();
  }, []);

  return (
    <>
      <div className="template_section">
        <div className="template_top">
          <div className="template_left">
            <span style={{ fontSize: "16px", color: "#202124" }}>
              <strong>Create Form</strong>
            </span>
          </div>
          <div className="template_right">
            <AddBoxIcon
              className="add_icon"
              color="primary"
              sx={{ fontSize: 50 }}
              onClick={createForm}
            />
          </div>
        </div>
        <div className="template_body"></div>
      </div>
      <div className="main_body">
        <div className="main_body_top">
          <div
            className="main_body_left"
            style={{ fontSize: "16px", fontWeight: "500" }}
          >
            Recent Forms
          </div>
          <div className="main_body_top_right"></div>
        </div>
        <div className="main_body_docs">
          {forms.map((form) => (
            <div className="form_card">
              <img className="form_card_image" src={formImage} alt="Form" />
              <div className="form_card_content">
                <h5>
                  {form.formName === ""
                    ? "Untitled Form"
                    : form.formdata.formName}
                </h5>
                <div className="form_content">
                  <div className="content_left">{form.createdat}</div>
                </div>
                <div className="form_content">
                  <div
                    onClick={() =>
                      history.push(`/form/${form.formdata.formPath}`)
                    }
                  >{`http://localhost:5000/form/${form.formdata.formPath}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadForms: () => dispatch(loadForms()),
  };
};

export default connect(null, mapDispatchToProps)(Template);
