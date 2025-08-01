function name(value) {
  if (!value) {
    return 'Title is required';
  }
  if (value.trim() === '') {
    return 'Title is required';
  }
}

function email(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function password(value) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
}

export const validate = {
  name,
  email,
  password,
};
