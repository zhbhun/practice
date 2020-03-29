class HTTPException implements Exception {
  final int status;
  final String message;

  HTTPException(this.status, this.message);
}

// 服务器运行错误
class HTTPServerException extends HTTPException {
  HTTPServerException(int status): super(status, '服务器出错了');
}

// 客户端网络错误
class HTTPNetworkException extends HTTPException {
  HTTPNetworkException(): super(600, '网络连接异常');
}

// 服务器格式错误
class HTTPFormatException extends HTTPException {
  HTTPFormatException() : super(700, '服务器出错了');
}

class HTTPEmptyException extends HTTPException {
  HTTPEmptyException() : super(700, '暂时没有数据');
}