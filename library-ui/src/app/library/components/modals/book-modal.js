import {rest} from "../../context";
import {addNewBook, deleteBook, removeBookMessage, updateBook} from "../../store/actions/book-actions";
import BookForm from "../forms/BookForm";
import ReduxDeleteModal from "./common/DeleteModal"
import ReduxFormModal from "./common/FormModal";
import {MODAL_IDS} from "./modal-ids";

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

export const DeleteBookModal = () => (<ReduxDeleteModal modalId={MODAL_IDS.DELETE_BOOK_MODAL}
                                                      createText={({name}) => `Book '${name}' will be removed. Enter Delete button to proceed.`}
                                                      action={deleteBook}
                                                      serverAction={book => rest.book.deleteBook(book)}/>);



