declare const CustomError: (StatusCode: string) => <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        name: string;
    };
} & T;
export default CustomError;
