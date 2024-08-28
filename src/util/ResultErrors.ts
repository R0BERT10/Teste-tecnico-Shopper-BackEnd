export type ResultError = {
    httpCodeResponse: number
    codeErrorResponse: string
    messageErrorResponse: string
    functionOriginError: string
}

export class ClientError implements ResultError {
    static readonly enums: string[] = ["INVALID_DATA", "INVALID_TYPE", "DOUBLE_REPORT", "MEASURE_NOT_FOUND", "MEASURES_NOT_FOUND", "CONFIRMATION_DUPLICATE"]

    static readonly INVALID_DATA = (message: string, origin: string) => { return new ClientError("INVALID_DATA", 400, message, origin) }
    static readonly INVALID_TYPE = (message: string, origin: string) => { return new ClientError("INVALID_TYPE", 400, message, origin) }
    static readonly DOUBLE_REPORT = (message: string, origin: string) => { return new ClientError("DOUBLE_REPORT", 409, message, origin) }
    static readonly MEASURE_NOT_FOUND = (message: string, origin: string) => { return new ClientError("MEASURE_NOT_FOUND", 400, message, origin) }
    static readonly MEASURES_NOT_FOUND = (message: string, origin: string) => { return new ClientError("MEASURES_NOT_FOUND", 400, message, origin) }
    static readonly CONFIRMATION_DUPLICATE = (message: string, origin: string) => { return new ClientError("CONFIRMATION_DUPLICATE", 400, message, origin) }


    static readonly generic = (message: string, origin: string) => { return new ClientError("genericError", 400, message, origin) }
    // private to disallow creating other instances of this type
    private constructor(
        public codeErrorResponse: string,
        public httpCodeResponse: number,
        public messageErrorResponse: string,
        public functionOriginError: string) {
    }

    toString() {
        return this.codeErrorResponse;
    }
}

export class ServerError implements ResultError {
    static readonly enums: string[] = ["INTERNAL_ERROR"]

    static readonly INTERNAL_ERROR = (origin: string) => { return new ServerError("INTERNAL_ERROR", 500, "Internal Server Error", origin) }

    static readonly generic = (message: string, origin: string) => { return new ServerError("genericError", 500, message, origin) }
    // private to disallow creating other instances of this type
    private constructor(
        public codeErrorResponse: string,
        public httpCodeResponse: number,
        public messageErrorResponse: string,
        public functionOriginError: string) {
        console.error(this.messageErrorResponse, this.functionOriginError)
    }

    toString() {
        return this.codeErrorResponse;
    }
}