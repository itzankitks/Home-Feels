// we can create a custom error class to handle errors in a more structured way

export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
