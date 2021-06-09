
export interface ApiResponseHandler {
    data: any;
    status: Boolean;
    statusCode: Number;
    message: String;
}

export interface ILoginModel {
    phoneNumber: string,
    email?: string,
    password:string
}

//type LoginModel = (phoneNumber: string,password: string, email?: string) => ILoginModel;

type ApiResponseBuilder =  (data: any, status: Boolean, statusCode: Number, message: String) => ApiResponseHandler;

export const apiResponseBuilder: ApiResponseBuilder = (data, status, statusCode,message) =>
                                 ({data: data, status: status, statusCode:statusCode, message:message});