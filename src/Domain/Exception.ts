export default abstract class ExceptionDomain implements Error {
  message: string;
  name: string;

  getMessage(): string {
    return this.message;
  }

  getErrorCode() {
    return this.name;
  }
}
