import * as Yup from "yup";

export const createValidationSchema = validators => Yup.object().shape({
    ..._.reduce(validators, (result, validator, key) => _.set(result, key, validator()), {})
});