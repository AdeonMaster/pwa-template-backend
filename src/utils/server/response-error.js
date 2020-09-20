// used to to be thrown on response errors (aren't catched by console)
export default class ResponseError extends Error {
  constructor(message) {
    super(message);

    this.name = 'ResponseError';
  }
}
