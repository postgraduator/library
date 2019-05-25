import {Fragment} from "react";
import {HashRouter} from "react-dom"
import {connect} from "react-redux";
import SignupButton from "./SignupButton";

const LibraryMainPage = ({user}) => (<Fragment>
    <header>
        <div className="container">
            <nav className="navbar navbar-light bg-light ustify-content-between">
                <span className="navbar-brand mb-0 h1">Hello {user.name}</span>
                <SignupButton/>
            </nav>
        </div>
    </header>
    <main>
        <div className="container">
            <div className="row">
                <div className="col-sm-2">
                    Menu
                </div>
                <div className="col-sm-10">
                    Router
                </div>
            </div>
        </div>
    </main>
</Fragment>);

export default connect((state) => ({user: {...state.user}}))(LibraryMainPage);