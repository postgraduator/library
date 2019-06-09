import {ErrorMessage, Field, Formik} from "formik";
import PropTypes from "prop-types";
import {Fragment} from "react";
import * as Yup from "yup";
import {rest} from "../../context";
import {createValidationSchema} from "../../utils/validator";
import BootstrapModalFooter from "../modals/BootstrapModalFooter";
import {FORM_IDS} from "./form-ids";

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

const NewBookForm = ({hideModal}) => {
    let errorMessage;
    return <Formik
        id={FORM_IDS.NEW_BOOK_FORM}
        initialValues={{
            name: '',
            count: 1,
            price: ''
        }}
        validationSchema={createValidationSchema(validators)}
        onSubmit={(values, {setSubmitting}) => rest.book
            .addNewBook({name: values.name, price: values.price, count: values.count}, _.head(values.picture) || null)
            .then(() => hideModal())
            .catch(({message}) => {errorMessage = message})
            .finally(() => setSubmitting(false))}>
        {({handleSubmit, setFieldValue, submitForm}) => {
            return <Fragment>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
                        <label htmlFor="book-price">Book name</label>
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
                    </div>
                </form>
                <BootstrapModalFooter saveModalTitle={'Save book'} saveModal={() => submitForm()}
                                      hideModal={hideModal}/>
            </Fragment>
        }}
    </Formik>
};

NewBookForm.propTypes = {
    hideModal: PropTypes.func.isRequired
};

export default NewBookForm;