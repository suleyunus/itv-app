class Responses {
  static HTTP_200_OK(data, res) {
    return res.status(200).json({
      status: 'Success',
      data,
    });
  }

  static HTTP_201_CREATED(message, data, res) {
    return res.status(201).json({
      status: 'Success',
      message,
      data,
    });
  }

  static HTTP_400_BAD_REQUEST(message, res) {
    return res.status(400).json({
      status: 'Error',
      message,
    });
  }

  static HTTP_403_UNAUTHORIZED(message, res) {
    return res.status(403).json({
      status: 'Error',
      message,
    });
  }

  static HTTP_404_NOT_FOUND(message, res) {
    return res.status(404).json({
      status: 'Error',
      message,
    });
  }

  static HTTP_409_CONFLICT(message, res) {
    return res.status(409).json({
      status: 'Error',
      message,
    });
  }
}

module.exports = Responses;
