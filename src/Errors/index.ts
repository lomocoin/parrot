import CustomError from './CustomError';

export const ErrorMap = new Map<string, string>([
  ['400', 'BadRequest'],
  ['401', 'Unauthorized'],
  ['404', 'NotFound'],
  ['412', 'PreconditionFailed'],
  ['422', 'UnprocessableEntity'],
  ['500', 'InternalServerError'],
]);

/* tslint:disable:max-classes-per-file */
@CustomError('400')
export class BadeRequestError {};

@CustomError('401')
export class UnauthorizedError {};

@CustomError('404')
export class NotFoundError {};

@CustomError('412')
export class PreconditionFailedError {};

@CustomError('422')
export class UnprocessableEntityError {};

@CustomError('500')
export class InternalServerErrorError {};
