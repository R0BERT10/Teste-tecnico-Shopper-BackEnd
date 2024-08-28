import { ResultError } from "./ResultClassHandle"

enum ServerErrors {
    INTERNAL_ERROR
}

export class ServerError implements ResultError {
    static readonly enum = ServerError

    static readonly INTERNAL_ERROR = (origin: string) => { return new ServerError("INTERNAL_ERROR", 500, "Internal Server Error", origin) }

    static readonly generic = (message: string, origin: string) => { return new ServerError("genericError", 500, message, origin) }
    // private to disallow creating other instances of this type
    private constructor(
        public codeErrorResponse: string,
        public httpCodeResponse: number,
        public messageErrorResponse: string,
        public functionOriginError: string
    ) {
        //Todo: add Handle catch to server errors.
        console.error(this.messageErrorResponse, this.functionOriginError)
    }

    toString() {
        return this.codeErrorResponse;
    }
}