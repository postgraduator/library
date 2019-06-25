export const restrictions = {
    name: {
        minLength: 3,
        maxLength: 30,
        regex: /\w+/
    },
    password: {
        minLength: 5,
        maxLength: 30,
        regex: /[a-zA-Z0-9]+/
    },
    birthday: {
        minAge: 12
    }
};