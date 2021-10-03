export class BadRequestError extends Error {
  constructor(message = 'Неверные параметры в запросе') {
    super(message);
    this.statusCode = 400;
  }
}
