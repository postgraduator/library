import PropTypes from "prop-types";
import {FORM_IDS} from "./form-ids";

const UserPermissionForm = ({applyChanges, formSubmitter, initialValues, data}) => {
    let permissionForm;
    const {permission} = initialValues;
    let newPermission = _.get(permission, 'name');
    const submitForm = event => {
        event.preventDefault();
        return applyChanges({user: initialValues, newPermission});
    };
    formSubmitter(() => permissionForm.dispatchEvent(new Event('submit')));
    return <form id={FORM_IDS.PERMISSION_FORM} onSubmit={submitForm} ref={form => permissionForm = form}>
        <div className="form-group">
            <label htmlFor={'permission-select'}>Select user permission</label>
            <select id={'permission-select'}
                    className="form-control"
                    defaultValue={newPermission}
                    onChange={event => newPermission = _.get(event, 'target.value')}>
                {_.map(data.permissions, ({name}) => <option key={name} value={name}>{name}</option>)}
            </select>
        </div>
    </form>
};

UserPermissionForm.propTypes = {
    applyChanges: PropTypes.func.isRequired,
    formSubmitter: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    data: PropTypes.object,
};

export default UserPermissionForm;