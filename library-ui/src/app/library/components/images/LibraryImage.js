import PropTypes from "prop-types";
import {Fragment} from "react";
import {serverInfoContext} from "../../context";

const LibraryImage = ({path, size = 'sm', className}) => (<Fragment>
    {path ? <img alt={'It is the place for a picture'}
                  src={_.startsWith(path, 'blob') ? path : serverInfoContext.uploadContext + '/' + path}
                  className={`image image-${size} ${className}`}/>
    : 'There is no picture for this item.'}
</Fragment>);

LibraryImage.propTypes = {
    path: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string
};

export default LibraryImage;