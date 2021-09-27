import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import FormTabs from "./components/form/FormTabs";
import QuestionForm from "./components/form/QuestionForm";
import Header from "./components/header/Header";
import Template from "./components/homePage/Template";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Router>
          <Switch>
            <Route path="/form/:id">
              <FormTabs />
              <QuestionForm />
            </Route>
            <Route path="/">
              <Template />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
};

export default App;
