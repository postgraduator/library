import {ErrorMessage, Field, Formik} from "formik";
import PropTypes from "prop-types";
import {Fragment} from "react";
import * as Yup from "yup";
import {OutlineDangerButton} from "../buttons/action-launcher";
import {FORM_IDS} from "./form-ids";

const getUniqueKey = ({_links}) => {
    const href = _.get(_links, 'self.href');
    return _(href)
        .split('/')
        .last();
};

const OrderItem = ({book, addToOrder, removeItem}) => {
    const name = getUniqueKey(book);
    return <div className="form-group row">
        <label className="col-sm-8">{book.name}</label>
        <div className="col-sm-2">
            <Field id={name}
                   className="form-control"
                   name={name}
                   onChange={
                       e => {
                           e.preventDefault();
                           addToOrder({book, count: _.parseInt(_.get(e, 'target.value', 1))});
                       }
                   }
                   component="input"
                   max={book.count}
                   min="1"
                   type="number" />
            <ErrorMessage className="text-danger" component="small" name={name}/>
        </div>
        <div className="col-sm-2">
            <OutlineDangerButton launcher={() => removeItem(book)} title={'Remove'}/>
        </div>
    </div>
};

const OrderForm = ({makeOrder, formSubmitter, orderedBooks, addToOrder, removeItem}) => {
    let errorMessage;
    const initialValues = _.reduce(orderedBooks, (result, {book, count}) => _.set(result, getUniqueKey(book), count), {});
    _.set(initialValues, 'orderCount', orderedBooks.length);
    const bookValidationSchema = _.reduce(orderedBooks, (result, {book}) => _.set(result, getUniqueKey(book),
        Yup.number()
            .moreThan(0, 'The number of books must be more than 0')
            .lessThan(book.count + 1, 'The requested count exceeds the available one')), {});
    const validationSchema = Yup.object().shape({
        ...bookValidationSchema,
        orderCount: Yup.number().moreThan(0, 'You have to add items to the cart')});
    return <Formik
        id={FORM_IDS.ORDER_FORM}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => makeOrder(_.omit(values, 'orderCount'))
            .catch(({message}) => {errorMessage = message})
            .finally(() => setSubmitting(false))}>
        {({submitForm}) => {
            formSubmitter(() => submitForm());
            return <Fragment>
                {_.isEmpty(orderedBooks) ?
                    <p>The shopping cart is empty</p> :
                    _.map(orderedBooks, ({book}) => <OrderItem key={book.name} book={book} addToOrder={addToOrder} removeItem={removeItem}/>)}
                <ErrorMessage className="text-danger" component="small" name="orderCount"/>
            </Fragment>
        }}
    </Formik>
};

OrderForm.propTypes = {
    makeOrder: PropTypes.func.isRequired,
    formSubmitter: PropTypes.func.isRequired,
    orderedBooks: PropTypes.array,
    addToOrder: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
};

export default OrderForm;