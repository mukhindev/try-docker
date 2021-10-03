export class ForbiddenError extends Error {
  constructor(message = 'Запрещено') {
    super(message);
    this.statusCode = 403;
  }
}
