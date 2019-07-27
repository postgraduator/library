import PropTypes from "prop-types";
import {Fragment} from "react";
import {serverInfoContext} from "../../context";

const LibraryImage = ({path, size = 'sm', className}) => (<Fragment>
    {path && <img alt={'Picture'}
                  src={_.startsWith(path, 'blob') ? path : serverInfoContext.uploadContext + '/' + path}
                  className={`image image-${size} ${className}`}/>}
</Fragment>);

LibraryImage.propTypes = {
    path: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string
};

export default LibraryImage;