import 'package:flutter/material.dart';
import 'package:cnodejs_flutter/exceptions/http_exception.dart';

class PageIndicator extends StatelessWidget {
  final bool loading;
  // TODO: 不一定是 Exception，也可能是 Error
  final Exception exception;
  final Function onRetry;

  PageIndicator({
    this.loading,
    this.exception,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    IconData icon = Icons.error;
    String message = '未知错误';
    if (exception is HTTPException) {
      HTTPException httpException = exception as HTTPException;
      if (httpException.message != null) {
        message = httpException.message;
      }
      if (exception is HTTPNetworkException) {
        icon = Icons.warning;
      } else if (exception is HTTPEmptyException) {
        icon = Icons.info;
      }
    }
    return SizedBox(
      width: double.infinity,
      height: double.infinity,
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: this.loading
            ? <Widget>[
                Container(
                  margin: EdgeInsets.only(bottom: 30),
                  width: 32,
                  height: 32,
                  child: CircularProgressIndicator(),
                ),
                Text('正在加载中...')
              ]
            : <Widget>[
                Container(
                  margin: EdgeInsets.only(bottom: 30),
                  child: Icon(
                    icon,
                    size: 60,
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(bottom: 10),
                  child: Text(message),
                ),
                RaisedButton(
                  child: Text('点击重试'),
                  onPressed: this.onRetry,
                )
              ],
      ),
    );
  }
}
