import {connect} from "react-redux";
import SignupButton from "./SignupButton";

const LibraryMainPage = ({user}) => (<div className="container">
    <header>Hello {user.name}
        <div className="float-right">
            <SignupButton/>
        </div>
    </header>
</div>);

export default connect((state) => ({user: {...state.user}}))(LibraryMainPage);