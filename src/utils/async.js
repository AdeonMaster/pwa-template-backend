export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlePromise = (promise) =>
  promise
    .then((result) => [result, null])
    .catch((error) => {
      console.log(error);
      return [null, error];
    });
