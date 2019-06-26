import get from "lodash/get";
import set from "lodash/set";
import * as Yup from "yup";

export const createValidationSchemaFrom = restrictions => {
    return Yup.object().shape({
        ...Object.keys(restrictions).reduce((validationSchema, key) => {
            const rawSchema = get(restrictions, `${key}.schema`)();
            const validators = get(restrictions, `${key}.validators`, {});
            const schema = Object.keys(validators)
                .reduce((schema, validatorPath) => validators[validatorPath](schema), rawSchema);
            return set(validationSchema, key, schema);
        }, {})
    })
};