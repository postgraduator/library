import omit from "lodash/omit";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import {Formik, Field} from "formik";
import PropTypes from "prop-types";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import ROUTER_LINK from "../constants/router-constants";
import {StateContext} from "../context";

const RegistrationForm = ({genders, removeAuthMessage, registerUser}) => {
    removeAuthMessage();
    return (<Fragment>
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmedPassword: '',
                gender: ''
            }}
            onSubmit={(values, {setSubmitting}) => {
                registerUser(omit(values, 'confirmedPassword'))
                    .then(() => setSubmitting(false));
            }}>
            {({values, errors, handleSubmit}) => (
                <form onSubmit={handleSubmit} noValidate>
                    <legend>Registration Form</legend>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="text" id="name" name="name" placeholder="Enter name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="email" id="email" name="email" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password" placeholder="Enter password"/>
                        <label htmlFor="confirmedPassword">Confirm password</label>
                        <input className="form-control" type="password" name="confirmedPassword"
                               placeholder="Confirm password"/>
                    </div>
                    <div className="form-group">
                        <Field component="select" name="gender" className="form-control">
                            <option value='' disabled={true}>Choose gender ...</option>
                            {isEmpty(genders) || map(genders, (gender, index) => (
                                <option key={index} value={gender.value}>{gender.view}</option>))}
                        </Field>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>)}
        </Formik>
        <Link className="float-right" to={ROUTER_LINK.root}>
            <small>Go to Login Form></small>
        </Link>
    </Fragment>)
};

RegistrationForm.propTypes = {
    removeAuthMessage: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    genders: PropTypes.array
};

export default () => (<StateContext.Consumer>
    {({genders, removeAuthMessage, registerUser}) => (<RegistrationForm
        genders={genders}
        removeAuthMessage={removeAuthMessage}
        registerUser={registerUser}/>)}
</StateContext.Consumer>);