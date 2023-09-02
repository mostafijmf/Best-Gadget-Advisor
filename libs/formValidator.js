import { isEmail, isStrongPassword } from 'validator';

export const formValidator = async ({
    email = '',
    password = '',
    title = '',
    coverPhoto_src = '',
    coverPhoto_alt = '',
    pathName = '',
    metaDescription = '',
    content = ''
}, {
    isLogin = false,
    isCreateBlog = false,
}) => {
    let errors = {};

    if (isLogin) {
        if (!isEmail(email, { domain_specific_validation: true })) {
            errors.email = 'Invalid email address';
        }

        if (!isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            errors.password = 'Password must have at least 8 characters, one Lowercase, one Uppercase, one Number, and one Symbol';
        };
    };

    if (isCreateBlog) {
        if (!title) {
            errors.title = 'Title is required!';
        };
        if (!coverPhoto_src) {
            errors.coverPhoto_src = 'Please select a photo';
        };
        if (!coverPhoto_alt) {
            errors.coverPhoto_alt = 'Image alt is required!';
        };
        if (!pathName) {
            errors.pathName = 'PathName is required!';
        };
        if (!metaDescription) {
            errors.metaDescription = 'Meta Description is required!';
        }
        else if (metaDescription.trim().length > 200) {
            errors.metaDescription = 'Description should be up to 200 characters...';
        };
        if (!content) {
            errors.content = 'Content is required!';
        };
    };

    return errors;
};