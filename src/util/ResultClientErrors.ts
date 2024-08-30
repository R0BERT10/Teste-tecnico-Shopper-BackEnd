import { ResultError } from "./ResultClassHandle"

enum ClientErrors {
    CONFLICT,
    INVALID_DATA,
    INVALID_TYPE = "Tipo de medição não permitida",
    DOUBLE_REPORT = "Leitura do mês já realizada",
    MEASURE_NOT_FOUND = "Leitura do mês já realizada", //Tobe fixed: "Leitura não encontrada"
    MEASURES_NOT_FOUND = "Nenhuma leitura encontrada",
    CONFIRMATION_DUPLICATE = "Leitura do mês já realizada"
}

export default class ClientError implements ResultError {
    static readonly enum = ClientErrors
    //static readonly CONFLICT = (conflictMessage: string, origin: string) => { return new ClientError("CONFLICT", 409, conflictMessage, origin) }

    static readonly INVALID_DATA = (message: string, origin: string) => { return new ClientError("INVALID_DATA", 400, message, origin) }
    static readonly INVALID_TYPE = (origin: string) => { return new ClientError("INVALID_TYPE", 400, this.enum.INVALID_TYPE, origin) }
    static readonly DOUBLE_REPORT = (origin: string) => { return new ClientError("DOUBLE_REPORT", 409, this.enum.DOUBLE_REPORT, origin) }
    static readonly MEASURE_NOT_FOUND = (origin: string) => { return new ClientError("MEASURE_NOT_FOUND", 404, this.enum.MEASURE_NOT_FOUND, origin) }
    static readonly MEASURES_NOT_FOUND = (origin: string) => { return new ClientError("MEASURES_NOT_FOUND", 404, this.enum.MEASURES_NOT_FOUND, origin) }
    static readonly CONFIRMATION_DUPLICATE = (origin: string) => { return new ClientError("CONFIRMATION_DUPLICATE", 409, this.enum.CONFIRMATION_DUPLICATE, origin) }

    static readonly generic = (message: string, origin: string) => { return new ClientError("genericError", 400, message, origin) }
    // private to disallow creating other instances of this type
    private constructor(
        public codeErrorResponse: string,
        public httpCodeResponse: number,
        public messageErrorResponse: string,
        public functionOriginError: string
    ) {
        console.error(this.messageErrorResponse, this.functionOriginError)
    }

    toString() {
        return this.codeErrorResponse;
    }
}
