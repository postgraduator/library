import {ErrorMessage, Field, Formik} from "formik";
import PropTypes from "prop-types";
import {Fragment} from "react";
import * as Yup from "yup";
import {createValidationSchema} from "../../utils/validator";
import {DangerAlert} from "../alerts/Alert";
import LibraryImage from "../images/LibraryImage";
import {FORM_IDS} from "./form-ids";

const getBookImagePath = ({picture, picturePath}) => {
    return _.isArray(picture) ? window.URL.createObjectURL(_.head(picture)) : (picturePath && `book/${picturePath}`);
};

const validators = {
    name: () => {
        const minLength = 1, maxLength = 256;
        return Yup.string()
            .min(minLength, `The book name must be more than ${minLength}.`)
            .max(maxLength, `The book name must be less than ${maxLength}.`)
            .required('The book name is required field.')
    },
    price: () => Yup.string()
        .matches(/\d+(\.\d{1,2})*/, 'The price has incorrect format.')
        .required('The price is required.'),
    count: () => Yup.number()
        .moreThan(0, 'The min count must be more than 0')
};

const BookForm = ({applyChanges, formSubmitter, initialValues}) => {
    let errorMessage;
    return <Formik
        id={FORM_IDS.NEW_BOOK_FORM}
        initialValues={initialValues}
        validationSchema={createValidationSchema(validators)}
        onSubmit={(values, {setSubmitting}) => applyChanges(values)
            .catch(({message}) => {errorMessage = message})
            .finally(() => setSubmitting(false))}>
        {({handleSubmit, setFieldValue, submitForm, values}) => {
            formSubmitter(() => submitForm());
            return <Fragment>
                <DangerAlert text={errorMessage}/>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="book-name">Book name</label>
                        <Field id="book-name"
                               className="form-control"
                               name="name"
                               component="input"
                               placeholder="Book name"
                               type="text"/>
                        <ErrorMessage className="text-danger" component="small" name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="book-price">Book price</label>
                        <Field id="book-price"
                               className="form-control"
                               name="price"
                               component="input"
                               placeholder="Price for one item"
                               type="text"/>
                        <ErrorMessage className="text-danger" component="small" name="price"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="book-count">Book count</label>
                        <Field id="book-count"
                               className="form-control"
                               name="count"
                               component="input"
                               type="number"
                               min="1"/>
                        <ErrorMessage className="text-danger" component="small" name="count"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="book-picture">Book picture</label>
                        <input id="book-picture"
                               className="form-control-file"
                               type="file"
                               accept="image/*"
                               onChange={(e) => {
                                   e.preventDefault();
                                   const files = [...e.target.files];
                                   setFieldValue('picture', files);
                               }}/>
                               <div className="float-right">
                                   <LibraryImage size={'lg'} path={getBookImagePath(values)}/>
                               </div>
                    </div>
                </form>
            </Fragment>
        }}
    </Formik>
};

BookForm.propTypes = {
    applyChanges: PropTypes.func.isRequired,
    formSubmitter: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired
};

export default BookForm;