import {compareAsc, subYears} from "date-fns";
import * as Yup from "yup";

export const USER_MIN_AGE = 12;

export const profileRestrictions = {
    name: {
        schema: Yup.string,
        validators: {
            minLength: schema => {
                const minLength = 3;
                return schema.min(minLength, `The name length must be more than ${minLength}.`)
            },
            maxLength: schema => {
                const maxLength = 30;
                return schema.max(maxLength, `The name length must be less than ${maxLength}.`)
            },
            regex: schema => schema.matches(/\w+/, 'The name must contain alphabetical and numerical symbols only.'),
            required: schema => schema.required('The name is required')
        }
    },
    password: {
        schema: Yup.string,
        validators: {
            minLength: schema => {
                const minLength = 5;
                return schema.min(minLength, `The password length must be more than ${minLength}`);
            },
            maxLength: schema => {
                const maxLength = 30;
                return schema.max(maxLength, `The password length must be less than ${maxLength}.`);
            },
            regex: schema => schema.matches(/[a-zA-Z0-9]+/, 'The password must contain alphabetical and numerical symbols only.'),
            required: schema => schema.required('The password is empty.')
        }
    },
    confirmedPassword: {
        schema: Yup.mixed,
        validators: {
            passwordEquality: schema => schema.oneOf([Yup.ref('password')], 'The passwords is not identical')
        }
    },
    email: {
        schema: Yup.string,
        validators: {
            email: schema => schema.email('Invalid email address.'),
            required: schema => schema.required('Email is required.')
        }
    },
    birthday: {
        schema: Yup.string,
        validators: {
            minAge: schema => {
                const minAge = USER_MIN_AGE;
                return schema.test('birthday', `The age must be more than ${minAge}`, date => compareAsc(date, subYears(new Date(), minAge)) <= 0)
            },
            nullable: schema => schema.nullable()
        }
    }
};