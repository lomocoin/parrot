"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
exports.ErrorMap = new Map([
    ['400', 'BadRequest'],
    ['401', 'Unauthorized'],
    ['404', 'NotFound'],
    ['412', 'PreconditionFailed'],
    ['422', 'UnprocessableEntity'],
    ['500', 'InternalServerError'],
]);
/* tslint:disable:max-classes-per-file */
let BadRequestError = class BadRequestError {
};
BadRequestError = __decorate([
    CustomError_1.default('400')
], BadRequestError);
exports.BadRequestError = BadRequestError;
;
let UnauthorizedError = class UnauthorizedError {
};
UnauthorizedError = __decorate([
    CustomError_1.default('401')
], UnauthorizedError);
exports.UnauthorizedError = UnauthorizedError;
;
let NotFoundError = class NotFoundError {
};
NotFoundError = __decorate([
    CustomError_1.default('404')
], NotFoundError);
exports.NotFoundError = NotFoundError;
;
let PreconditionFailedError = class PreconditionFailedError {
};
PreconditionFailedError = __decorate([
    CustomError_1.default('412')
], PreconditionFailedError);
exports.PreconditionFailedError = PreconditionFailedError;
;
let UnprocessableEntityError = class UnprocessableEntityError {
};
UnprocessableEntityError = __decorate([
    CustomError_1.default('422')
], UnprocessableEntityError);
exports.UnprocessableEntityError = UnprocessableEntityError;
;
let InternalServerErrorError = class InternalServerErrorError {
};
InternalServerErrorError = __decorate([
    CustomError_1.default('500')
], InternalServerErrorError);
exports.InternalServerErrorError = InternalServerErrorError;
;
//# sourceMappingURL=index.js.map