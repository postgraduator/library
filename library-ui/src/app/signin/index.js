import "react-datepicker/dist/react-datepicker.css";
import "./css/style.css";
import React from "react";
import {render} from "react-dom";
import SigninPage from "./components/SigninPage"
import {SIGNIN_APP_ID} from "./context";

render(<SigninPage/>, document.getElementById(SIGNIN_APP_ID));