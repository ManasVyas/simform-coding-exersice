import React, { useState, useEffect } from "react";
import {
  IconButton,
  Select,
  Switch,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControlLabel,
  Typography,
  MenuItem,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SubjectIcon from "@mui/icons-material/Subject";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import "./QuestionForm.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { addForm } from "../../redux/actions/formActions";
import { useHistory, useParams } from "react-router-dom";

const QuestionForm = (props) => {
  const [questions, setQuestions] = useState([
    {
      questionText: "Name the capital of Gujarat",
      questionType: "radio",
      options: [
        { optionText: "Ahmedabad" },
        { optionText: "Surat" },
        { optionText: "Gandhinagar" },
        { optionText: "Vadodara" },
      ],
      open: true,
      required: false,
    },
  ]);
  const [formName, setFormName] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("Add Description");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (Array.isArray(props.forms)) {
      const form = props.forms.find((form) => form.formdata.formPath === id);
      if (form) {
        setQuestions(form.formdata.questions);
        setFormName(form.formdata.formName);
        setFormDescription(form.formdata.formDescription);
      }
    }
  }, []);

  const changeQuestion = (e, i) => {
    let newQuestion = [...questions];
    newQuestion[i].questionText = e.target.value;
    setQuestions(newQuestion);
  };

  const addQuestionType = (i, type) => {
    let qs = [...questions];
    qs[i].questionType = type;
    setQuestions(qs);
  };

  const changeOptionValue = (text, i, j) => {
    let optionQuestion = [...questions];
    optionQuestion[i].options[j].optionText = text;
    setQuestions(optionQuestion);
  };

  const removeOption = (i, j) => {
    let removeOptionQuestion = [...questions];
    if (removeOptionQuestion[i].options.length > 1) {
      removeOptionQuestion[i].options.splice(j, 1);
      setQuestions(removeOptionQuestion);
    }
  };

  const addOption = (i) => {
    let optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionsText: `Option ${optionsOfQuestion[i].options.length} + 1`,
      });
      setQuestions(optionsOfQuestion);
    }
  };

  const copyQuestion = (i) => {
    expandCloseAll();
    let qs = JSON.parse(JSON.stringify(questions));
    let newQuestion = qs[i];
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (i) => {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  };

  const requiredQuestion = (i) => {
    let reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required;
    setQuestions(reqQuestion);
  };

  const addMoreQuestionField = () => {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "New Question",
        questionType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    var itemg = [...questions];
    const itemF = reorder(itemg, result.source.index, result.destination.index);
    setQuestions(itemF);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const expandCloseAll = () => {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  };

  const handleExpand = (i) => {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  };

  const saveForm = async () => {
    await props.addForm({ questions, formName, formDescription, formPath: id });
    history.push("/");
  };

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </div>
                <div>
                  <Accordion
                    expanded={ques.open}
                    className={ques.open ? "add_border" : ""}
                    onChange={() => handleExpand(i)}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      elevation={1}
                      style={{ width: "100%" }}
                    >
                      {!ques.open ? (
                        <div className="saved_questions">
                          <Typography
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              letterSpacing: ".1px",
                              lineHeight: "24px",
                              paddingBottom: "8px",
                            }}
                          >
                            {i + 1}. {ques.questionText}
                          </Typography>

                          {ques.options.map((op, j) => (
                            <div key={j}>
                              <div style={{ display: "flex" }}>
                                <FormControlLabel
                                  style={{
                                    marginLeft: "5px",
                                    marginBottom: "5px",
                                  }}
                                  disabled
                                  control={
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      style={{ marginRight: "3px" }}
                                      required={ques.required}
                                    />
                                  }
                                  label={
                                    <Typography
                                      style={{
                                        fontFamily: " Roboto,Arial,sans-serif",
                                        fontSize: " 13px",
                                        fontWeight: "400",
                                        letterSpacing: ".2px",
                                        lineHeight: "20px",
                                        color: "#202124",
                                      }}
                                    >
                                      {ques.options[j].optionText}
                                    </Typography>
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </AccordionSummary>
                    {ques.open ? (
                      <div className="question_boxes">
                        <AccordionDetails className="add_question">
                          <div>
                            <div className="add_question_top">
                              <input
                                type="text"
                                className="question"
                                placeholder="Question"
                                value={ques.questionText}
                                onChange={(e) => changeQuestion(e, i)}
                              ></input>
                              {/* <CropOriginalIcon style={{ color: "#5f6368" }} /> */}

                              <Select
                                className="select"
                                style={{ color: "#5f6368", fontSize: "13px" }}
                              >
                                <MenuItem
                                  id="text"
                                  value="Text"
                                  onClick={() => addQuestionType(i, "text")}
                                >
                                  {" "}
                                  <SubjectIcon
                                    style={{ marginRight: "10px" }}
                                  />{" "}
                                  Paragraph
                                </MenuItem>

                                <MenuItem
                                  id="checkbox"
                                  value="Checkbox"
                                  onClick={() => addQuestionType(i, "checkbox")}
                                >
                                  <CheckBoxIcon
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Checkboxes
                                </MenuItem>
                                <MenuItem
                                  id="radio"
                                  value="Radio"
                                  onClick={() => addQuestionType(i, "radio")}
                                >
                                  {" "}
                                  <Radio
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Multiple Choice
                                </MenuItem>
                              </Select>
                            </div>

                            {ques.options.map((op, j) => (
                              <div className="add_question_body" key={j}>
                                {ques.questionType !== "text" ? (
                                  <input
                                    type={ques.questionType}
                                    style={{ marginRight: "10px" }}
                                  />
                                ) : (
                                  <SubjectIcon
                                    style={{ marginRight: "10px" }}
                                  />
                                )}
                                <div>
                                  <input
                                    type="text"
                                    className="text_input"
                                    placeholder="option"
                                    value={ques.options[j].optionText}
                                    onChange={(e) =>
                                      changeOptionValue(e.target.value, i, j)
                                    }
                                  />
                                </div>

                                {/* <CropOriginalIcon style={{ color: "#5f6368" }} /> */}

                                <IconButton aria-label="delete">
                                  <CloseIcon
                                    onClick={() => removeOption(i, j)}
                                  />
                                </IconButton>
                              </div>
                            ))}

                            {ques.options.length < 5 ? (
                              <div className="add_question_body">
                                <FormControlLabel
                                  disabled
                                  control={
                                    ques.questionType !== "text" ? (
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        inputProps={{
                                          "aria-label": "secondary checkbox",
                                        }}
                                        style={{
                                          marginLeft: "10px",
                                          marginRight: "10px",
                                        }}
                                        disabled
                                      />
                                    ) : (
                                      <SubjectIcon
                                        style={{ marginRight: "10px" }}
                                      />
                                    )
                                  }
                                  label={
                                    <div>
                                      <input
                                        type="text"
                                        className="text_input"
                                        style={{
                                          fontSize: "13px",
                                          width: "60px",
                                        }}
                                        placeholder="Add other"
                                      ></input>
                                      <Button
                                        size="small"
                                        style={{
                                          textTransform: "none",
                                          color: "#4285f4",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                        onClick={() => addOption(i)}
                                      >
                                        Add Option
                                      </Button>
                                    </div>
                                  }
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="add_footer">
                              <div className="add_question_bottom">
                                {questions.length - 1 === i && (
                                  <IconButton>
                                    <AddCircleOutlineIcon
                                      onClick={addMoreQuestionField}
                                    />
                                  </IconButton>
                                )}
                                <IconButton
                                  aria-label="Copy"
                                  onClick={() => copyQuestion(i)}
                                >
                                  <FilterNoneIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => deleteQuestion(i)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                                <span
                                  style={{
                                    color: "#5f6368",
                                    fontSize: "13px",
                                  }}
                                >
                                  Required{" "}
                                </span>{" "}
                                <Switch
                                  name="checkedA"
                                  color="primary"
                                  checked={ques.required}
                                  onClick={() => requiredQuestion(i)}
                                />
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </div>
                    ) : (
                      ""
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <div className="question_form">
      <br />
      <div className="section">
        <div className="question_title_section">
          <div className="question_form_top">
            <input
              type="text"
              className="question_form_top_name"
              name="formName"
              value={formName}
              style={{ color: "#000" }}
              placeholder="Untitled Document"
              onChange={(e) => setFormName(e.target.value)}
            />
            <input
              type="text"
              className="question_form_top_desc"
              name="formDescription"
              value={formDescription}
              placeholder="Form Description"
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questionsUI()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="save_form">
          <Button
            variant="contained"
            color="primary"
            onClick={saveForm}
            style={{ fontSize: "14px", marginTop: "5px" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    forms: state.formReducer.forms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addForm: (formDetails) => dispatch(addForm(formDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
