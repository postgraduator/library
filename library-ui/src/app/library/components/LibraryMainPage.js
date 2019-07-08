import {Fragment} from "react";
import {connect} from "react-redux";
import {HashRouter} from "react-router-dom";
import {Menu, RouterMain} from "./router-menu";
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
                <HashRouter>
                    <div className="col-sm-2">
                        <Menu/>
                    </div>
                    <div className="col-sm-10">
                        <RouterMain/>
                    </div>
                </HashRouter>
            </div>
        </div>
    </main>
</Fragment>);

export default connect(({current}) => ({user: {...current.user}}))(LibraryMainPage);