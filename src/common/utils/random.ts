export const generatePassword = (length: number = 8): string => {
  let result = '';
  const alphaNum =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    result += alphaNum.charAt(Math.floor(Math.random() * alphaNum.length));
  }

  return `${result}v1`;
};

export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';

  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};
