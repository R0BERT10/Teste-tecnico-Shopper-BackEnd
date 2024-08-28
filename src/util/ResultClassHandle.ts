import { ResultError } from "./ResultErrors";

export class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error?: ResultError
  private _value?: T

  private constructor(isSuccess: boolean, error?: ResultError, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
          successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess || this._value == undefined) {
      throw new Error(`Cant retrieve the value from a failed result.
            Error: ${this.error?.messageErrorResponse}`)
    }

    return this._value;
  }

  public getError(): ResultError {
    if (!this.isFailure || !this.error) {
      throw new Error("Not possible error not generated.")
    }
    return this.error
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: ResultError): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}