import { ErrorMap } from './';

const CustomError = (StatusCode: string) => <T extends {new(...args:any[]): {}}>(constructor: T) => {
  return class ErrorInstance extends constructor {
    constructor(...args: any[]) {
      super(...args);
      this.name = ErrorMap.get(StatusCode) || ErrorMap.get('InternalServerError')!;
    }
    name: string;
  }
};

export default CustomError;
