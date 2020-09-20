import crypto from 'crypto';

export const responseError = (response, code, error) => response.status(code).json({ error, code });

export const isValidEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase(),
  );

export const isValidPassword = (password) => {
  if (password) {
    const len = password.length;

    return len > 6 && len <= 128;
  }

  return false;
};

// fastest according to https://medium.com/@chris_72272/what-is-the-fastest-node-js-hashing-algorithm-c15c1a0e164e
export const hash = (string) => crypto.createHash('sha1').update(string).digest('base64');

export const generateDisplayName = () => `pupil${100000 + Math.floor(Math.random() * 899999)}`;

export const isValidISOString = (dateString) =>
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(dateString);

export const isValidUUID = (uuid) => /.{8}-.{4}-.{4}-.{4}-.{12}/.test(uuid);
