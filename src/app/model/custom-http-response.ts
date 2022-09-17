import { AppRoutingModule } from "../app-routing.module";

export interface CustomHttpResponse {

    httpStatusCode: number;
    httpStatus:string;
    reason:string;
    message:string;

}