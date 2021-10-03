export class ConflictError extends Error {
  constructor(message = 'Возник конфликт') {
    super(message);
    this.statusCode = 409;
  }
}
