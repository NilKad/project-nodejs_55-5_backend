class NodeError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongIdError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class UnauthorizedError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class DuplicateEmailError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  NodeError,
  ValidationError,
  WrongIdError,
  UnauthorizedError,
  DuplicateEmailError
};
