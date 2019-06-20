import {rest} from "../../context";
import {addNewBook, removeBookMessage, updateBook} from "../../store/actions/book-actions";
import BookForm from "../forms/BookForm";
import {MODAL_IDS} from "./common/modal-ids";
import ReduxFormModal from "./FormModal"

export const NewBookModal = () => (<ReduxFormModal modalId={MODAL_IDS.NEW_BOOK_MODAL}
                                                   createTitle={() => 'Add New Book'}
                                                   buttonTitle={'Save book'}
                                                   action={addNewBook}
                                                   serverAction={(values) => rest.book.addNewBook(values)}
                                                   removeMessage={removeBookMessage}
                                                   ActionForm={BookForm}/>);

export const UpdateBookModal = () => (<ReduxFormModal modalId={MODAL_IDS.UPDATE_BOOK_MODAL}
                                                      createTitle={({name}) => `Update \'${name}\' book`}
                                                      buttonTitle={'Update book'}
                                                      action={updateBook}
                                                      serverAction={(values) => rest.book.updateBook(values)}
                                                      removeMessage={removeBookMessage}
                                                      ActionForm={BookForm}/>);



