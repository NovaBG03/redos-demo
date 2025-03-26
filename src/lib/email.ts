const EMAIL_REGEX =
  /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;

export const subscribeWithEmail = (email: string) => {
  if (!email || !EMAIL_REGEX.test(email)) {
    throw new Error('Invalid email address');
  }
  console.log('Subscribed', email);
};
