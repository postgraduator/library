import React from "react";
import {render} from "react-dom";

const HelloSigninPage = ({message = "Hello Sign In Page"}) => (<div>{message}</div>);

render(<HelloSigninPage/>, document.getElementById("signin-app"));