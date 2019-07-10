import PropTypes from "prop-types";

const InputFilter = ({setFilterValue, filterValue = ''}) => {
    let inputValue;
    return <input onChange={event => inputValue = _.get(event, 'target.value')}
                  onKeyDown={event => event.keyCode === KeyboardEvent.DOM_VK_RETURN && setFilterValue(inputValue)}
                  defaultValue={filterValue}/>
};

InputFilter.propTypes = {
    setFilterValue: PropTypes.func.isRequired,
    filterValue: PropTypes.string
};

export default InputFilter;