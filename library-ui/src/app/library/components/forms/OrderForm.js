import PropTypes from "prop-types";
import {Formik, Field, ErrorMessage} from "formik";
import {Fragment} from "react";
import {FORM_IDS} from "./form-ids";
import * as Yup from "yup";

const getUniqueKey = ({_links}) => {
    const href = _.get(_links, 'self.href');
    return _(href)
        .split('/')
        .last();
};

const OrderItem = ({book, addToOrder}) => {
    const name = getUniqueKey(book);
    return <div className="form-group row">
        <label className="col-sm-10">{book.name}</label>
        <div className="col-sm-2">
            <Field id={name}
                   className="form-control"
                   name={name}
                   onChange={
                       e => {
                           e.preventDefault();
                           addToOrder({book, count: _.get(e, 'target.value')});
                       }
                   }
                   component="input"
                   min="1"
                   type="number" />
            <ErrorMessage className="text-danger" component="small" name={name}/>
        </div>
    </div>
};

const OrderForm = ({makeOrder, formSubmitter, orderedBooks, addToOrder}) => {
    let errorMessage;
    const initialValues = _.reduce(orderedBooks, (result, {book, count}) => _.set(result, getUniqueKey(book), count), {});
    const validationSchema = _.reduce(orderedBooks, (result, {book}) => _.set(result, getUniqueKey(book),
        Yup.number()
            .moreThan(0, 'The number of books must be more than 0')
            .lessThan(book.count + 1, 'The requested count exceeds the available one')));
    return <Formik
        id={FORM_IDS.ORDER_FORM}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => makeOrder(values)
            .catch(({message}) => {errorMessage = message})
            .finally(() => setSubmitting(false))}>
        {({submitForm}) => {
            formSubmitter(() => submitForm());
            return <Fragment>
                {_.map(orderedBooks, ({book}) => <OrderItem key={book.name} book={book} addToOrder={addToOrder}/>)}
            </Fragment>
        }}
    </Formik>
};

OrderForm.propTypes = {
    makeOrder: PropTypes.func.isRequired,
    formSubmitter: PropTypes.func.isRequired,
    orderedBooks: PropTypes.array,
    addToOrder: PropTypes.func.isRequired
};

export default OrderForm;