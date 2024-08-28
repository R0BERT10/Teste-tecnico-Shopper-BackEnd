import { ResultError } from "./ResultClassHandle";

export function errorBodyResponse(resultError: ResultError) {
    return {
        error_code: resultError.codeErrorResponse,
        error_description: resultError.messageErrorResponse
    }
}