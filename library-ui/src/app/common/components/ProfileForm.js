import {subYears} from "date-fns";
import {ErrorMessage, Field, Formik} from "formik";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import omit from "lodash/omit";
import PropTypes from "prop-types";
import Datepicker from "react-datepicker/es";
import {createValidationSchemaFrom} from "../validation/yup-schema-reducer";

const ProfileStatelessForm = ({handleSubmit, isSubmitting, isValidating, values, setFieldValue, minAge, genders = []}) => (
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
    </form>);

ProfileStatelessForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isValidating: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    minAge: PropTypes.number.isRequired,
    genders: PropTypes.array
};


const ProfileForm = ({genders, minAge, formAction, restrictions, initialValues}) => (<Formik
    initialValues={initialValues}
    validateOnChange={false}
    validationSchema={createValidationSchemaFrom(restrictions)}
    onSubmit={(values, {setSubmitting, resetForm}) => {
        formAction(omit(values, 'confirmedPassword'))
            .then(() => {
                resetForm();
            })
            .finally(() => setSubmitting(false));
    }}>
    {({handleSubmit, isSubmitting, isValidating, values, setFieldValue}) =>
        (<ProfileStatelessForm handleSubmit={handleSubmit}
                               minAge={minAge}
                               genders={genders}
                               isValidating={isValidating} setFieldValue={setFieldValue}
                               isSubmitting={isSubmitting}
                               values={values}/>)}
</Formik>);

ProfileForm.propTypes = {
    formAction: PropTypes.func.isRequired,
    genders: PropTypes.array,
    minAge: PropTypes.number.isRequired,
    restrictions: PropTypes.object,
    initialValues: PropTypes.object.isRequired
};


export default ProfileForm;