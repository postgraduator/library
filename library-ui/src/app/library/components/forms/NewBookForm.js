import {Field, Formik} from "formik";
import {FORM_IDS} from "./form-ids";

const NewBookForm = ({saveNewBook = values => values}) => (<Formik
    id={FORM_IDS.NEW_BOOK_FORM}
    initialValues={{
        name: '',
        count: 1,
        price: '',
    }}
    onSubmit={(values) => saveNewBook(values)}>
    {({handleSubmit, setFieldValue}) => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="book-name">Book name</label>
                <Field id="book-name"
                       className="form-control"
                       name="name"
                       component="input"
                       placeholder="Book name"
                       type="text"/>
            </div>
            <div className="form-group">
                <label htmlFor="book-price">Book name</label>
                <Field id="book-price"
                       className="form-control"
                       name="price"
                       component="input"
                       placeholder="Price for one item"
                       type="text"/>
            </div>
            <div className="form-group">
                <label htmlFor="book-count">Book count</label>
                <Field id="book-count"
                       className="form-control"
                       name="count"
                       component="input"
                       type="number"
                       min="1"/>
            </div>
            <div className="form-group">
                <label htmlFor="book-picture">Book picture</label>
                <input id="book-picture"
                       className="form-control-file"
                       type="file"
                       onChange={(e) => {
                           e.preventDefault();
                           const files = [...e.target.files];
                           setFieldValue('picture', files);
                       }}/>
            </div>
        </form>)}
</Formik>);

export default NewBookForm;