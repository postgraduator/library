import {compareAsc, subYears} from "date-fns";
import {ErrorMessage, Field, Formik} from "formik";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import omit from "lodash/omit";
import set from "lodash/set";
import PropTypes from "prop-types";
import {Fragment} from "react";
import Datepicker from "react-datepicker";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import ROUTER_LINK from "../constants/router-constants";
import {restrictions} from "../constants/validation-constants";
import {StateContext} from "../context";

const validators = {
    name: () => {
        const {name} = restrictions;
        return Yup.string()
            .min(name.minLength, `The name length must be more than ${name.minLength}.`)
            .max(name.maxLength, `The name length must be less than ${name.maxLength}.`)
            .matches(name.regex, 'The name must contain alphabetical and numerical symbols only.')
            .required('The name is required');
    },
    email: () => {
        return Yup.string()
            .email('Invalid email address.')
            .required('Email is required.');
    },
    password: () => {
        const {password} = restrictions;
        return Yup.string()
            .min(password.minLength, `The password length must be more than ${password.minLength}`)
            .max(password.maxLength, `The password length must be less than ${password.maxLength}.`)
            .matches(password.regex, 'The password must contain alphabetical and numerical symbols only.')
            .required('The password is empty.');
    },
    confirmedPassword: () => {
        return Yup.mixed()
            .oneOf([Yup.ref('password')], 'The passwords is not identical')
            .required('The password is empty.');
    },
    birthday: () => {
        const {birthday} = restrictions;
        return Yup.string()
            .test('birthday', `The age must be more than ${birthday.minAge}`, date => compareAsc(date, subYears(new Date(), birthday.minAge)) <= 0)
            .nullable();
    }
};

const validationSchema = Yup.object().shape({
    ...Object.keys(validators).reduce((schema, key) => set(schema, key, get(validators, key)()), {})
});

const RegistrationForm = ({genders, minAge, removeAuthMessage, registerUser}) => {
    removeAuthMessage();
    return (<Fragment>
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmedPassword: '',
                gender: '',
                birthday: ''
            }}
            validateOnChange={false}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                registerUser(omit(values, 'confirmedPassword'))
                    .then(() => {
                        resetForm();
                    })
                    .finally(() => setSubmitting(false));
            }}>
            {({handleSubmit, isSubmitting, isValidating, values, setFieldValue}) => (
                <form onSubmit={handleSubmit} noValidate>
                    <input type="password" style={{visibility: 'hidden'}}/>
                    <legend>Registration Form</legend>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field id="name"
                               className="form-control"
                               type="text"
                               name="name"
                               placeholder="Enter name"/>
                        <ErrorMessage className="text-danger" component="small" name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field id="email"
                               className="form-control"
                               type="email"
                               name="email"
                               placeholder="Enter email"/>
                        <ErrorMessage className="text-danger" component="small" name="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field id="password"
                               className="form-control"
                               autoComplete="new-password"
                               type="password"
                               name="password"
                               placeholder="Enter password"/>
                        <ErrorMessage className="text-danger" component="small" name="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmedPassword">Confirm password</label>
                        <Field id="confirmedPassword"
                               className="form-control"
                               type="password"
                               name="confirmedPassword"
                               placeholder="Confirm password"/>
                        <ErrorMessage className="text-danger" component="small" name="confirmedPassword"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Birthday</label>
                        <Datepicker id="birthday"
                                    selected={values.birthday}
                                    onChange={date => setFieldValue('birthday', date)}
                                    showYearDropdown
                                    scrollableYearDropdown
                                    maxDate={subYears(new Date(), minAge)}
                                    isClearable={true}
                                    className="form-control"/>
                        <ErrorMessage className="text-danger" component="small" name="birthday"/>
                    </div>
                    <div className="form-group">
                        <Field component="select" name="gender" className="form-control">
                            <option value='' disabled={true}>Choose gender ...</option>
                            {isEmpty(genders) || map(genders, (gender) => (
                                <option key={gender.value} value={gender.value}>{gender.view}</option>))}
                        </Field>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting || isValidating}>Register
                    </button>
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
    genders: PropTypes.array,
    minAge: PropTypes.number.isRequired
};

export default () => (<StateContext.Consumer>
    {({genders, removeAuthMessage, registerUser}) => (<RegistrationForm
        genders={genders}
        removeAuthMessage={removeAuthMessage}
        minAge={restrictions.birthday.minAge}
        registerUser={registerUser}/>)}
</StateContext.Consumer>);