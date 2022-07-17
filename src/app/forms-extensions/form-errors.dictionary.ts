export const errorsDictionary: {[key:string]:string} = {
    required: 'This field is required',
    email: 'This field must be a valid email',
    passwordConfirmation: 'Passwords do not match',
    isEmailAvailable: 'Email is already taken',
    isNameAvailable: 'Name is already taken',
    maxlength: 'Maximum of {n} character allowed, current: {n2}',
    minlength: 'At leats {n} characters required, current: {n2}',
    alphaNumExtras: 'Only letters, numbers, spaces, dashes, underscores and dots allowed',
    password: 'Password must contain at least 1 lowercase letter, uppercase letter, number and special character',
    imageType: 'Allowed formats: jpg, jpeg, webp, png',
    imageSize: 'The image size must be less than 2 Mb',
    min: 'This field is required',
}