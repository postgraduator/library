import {ErrorMessage, Field, Formik} from "formik";
import PropTypes from "prop-types";
import {Component, Fragment} from "react";
import * as Yup from "yup";
import {getUniqueKey} from "../../store/reducers/order-reducers";
import {OutlineDangerButton} from "../buttons/action-launcher";
import {FORM_IDS} from "./form-ids";

const OrderItem = ({book, removeItem}) => {
    const name = getUniqueKey(book);
    return <div className="form-group row">
        <div className="col-sm-8">
            <label>{book.name}</label>
            <div>
                <ErrorMessage className="text-danger" component="small" name={name}/>
            </div>
        </div>
        <div className="col-sm-2">
            <Field id={name}
                   className="form-control"
                   name={name}
                   component="input"
                   max={book.count}
                   min="1"
                   type="number"/>
        </div>
        <div className="col-sm-2">
            <OutlineDangerButton launcher={() => removeItem(book)} title={'Remove'}/>
        </div>
    </div>
};

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.formData = {};
    }

    componentWillUnmount() {
        const isOrderCartChanged = (orderedBooks, formData) => _.some(orderedBooks, orderedBook => {
            const id = getUniqueKey(orderedBook.book);
            return _.get(orderedBook, 'count') - _.get(formData, id);
        });

        const {addToOrder, orderedBooks} = this.props;
        isOrderCartChanged(orderedBooks, this.formData) && addToOrder(this.formData);
    }

    render() {
        const {makeOrder, formSubmitter, orderedBooks, removeItem, afterOrderCallback} = this.props;
        let errorMessage;
        const initialValues = _.reduce(orderedBooks, (result, {book, count}) => _.set(result, getUniqueKey(book), count), {});
        _.set(initialValues, 'orderCount', orderedBooks.length);
        const bookValidationSchema = _.reduce(orderedBooks, (result, {book}) => _.set(result, getUniqueKey(book),
            Yup.number()
                .moreThan(0, 'The number of books must be more than 0')
                .lessThan(book.count + 1, 'The requested count exceeds the available one')), {});
        const validationSchema = Yup.object().shape({
            ...bookValidationSchema,
            orderCount: Yup.number().moreThan(0, 'You have to add items to the cart')
        });
        return <Formik
            id={FORM_IDS.ORDER_FORM}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => makeOrder(_.omit(values, 'orderCount'))
                .then(data => {
                    afterOrderCallback();
                    return data;
                })
                .catch(({message}) => {
                    errorMessage = message
                })
                .finally(() => setSubmitting(false))}>
            {({submitForm, values}) => {
                formSubmitter(() => submitForm());
                this.formData = values;
                return <Fragment>
                    {_.isEmpty(orderedBooks) ?
                        <p>The shopping cart is empty</p> :
                        _.map(orderedBooks, ({book}) => <OrderItem key={book.name}
                                                                   book={book}
                                                                   removeItem={removeItem}/>)}
                    <ErrorMessage className="text-danger" component="small" name="orderCount"/>
                </Fragment>
            }}
        </Formik>
    }
}

OrderForm.propTypes = {
    makeOrder: PropTypes.func.isRequired,
    formSubmitter: PropTypes.func.isRequired,
    orderedBooks: PropTypes.array,
    addToOrder: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    afterOrderCallback: PropTypes.func.isRequired
};

export default OrderForm;