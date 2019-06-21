import PropTypes from "prop-types";
import {Fragment} from "react";
import {serverInfoContext} from "../../context";

const LibraryImage = ({path, size = 'sm'}) => (<Fragment>
    {path && <img alt={'Picture'} src={`${serverInfoContext.uploadContext}/${path}`} className={`image image-${size}`}/>}
</Fragment>);

LibraryImage.propTypes = {
    path: PropTypes.string,
    size: PropTypes.string
};

export default LibraryImage;