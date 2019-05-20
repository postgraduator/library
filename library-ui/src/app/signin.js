import React from "react";
import {render} from "react-dom";
import SigninPage from "./signin/components/SigninPage"
import {SIGNIN_APP_ID} from "./signin/context";

render(<SigninPage/>, document.getElementById(SIGNIN_APP_ID));