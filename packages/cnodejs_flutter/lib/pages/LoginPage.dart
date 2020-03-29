import 'package:cnodejs_flutter/services/data_service.dart';
import 'package:flutter/material.dart';
import 'package:cnodejs_flutter/models/session.dart';
import 'package:cnodejs_flutter/widgets/provider.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  String _accessToken = '';
  bool _isSubmitting = false;
  bool _isInvalidAsyncAccessToken = false;

  void submit(Session session) async {
    if (this._isSubmitting) {
      return;
    }
    if (this._formKey.currentState.validate()) {
      this.setState(() {
        this._isSubmitting = true;
      });
      try {
        var author = await DataService.getInstance().login(this._accessToken);
        this.setState(() {
          this._isSubmitting = false;
        });
        session.login(
          user: author,
          accessToken: this._accessToken,
        );
        Navigator.of(context).pop();
      } catch (e) {
        this._isInvalidAsyncAccessToken = true;
        this._formKey.currentState.validate();
        this.setState(() {
          this._isSubmitting = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Stack(
        children: <Widget>[
          Scaffold(
            body: Column(
              children: <Widget>[
                AppBar(
                  title: Text('登录'),
                  flexibleSpace: Container(
                    height: 200,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage('assets/images/bg_login_header.png'),
                        fit: BoxFit.cover,
                      ),
                    ),
                    child: Center(
                      child: Image.asset(
                        'assets/images/logo.png',
                        width: 300,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            left: 15,
            right: 15,
            top: 150,
            child: Column(
              children: <Widget>[
                Card(
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 15, vertical: 20),
                    child: Form(
                      key: this._formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          TextFormField(
                            readOnly: this._isSubmitting,
                            decoration: const InputDecoration(
                              hintText: 'Access Token',
                            ),
                            validator: (value) {
                              if (value.isEmpty) {
                                return 'Access Token 不能为空';
                              } else if (!(new RegExp(
                                      r'^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$')
                                  .hasMatch(value))) {
                                return 'Access Token 格式错误，应为 UUID';
                              } else if (this._isInvalidAsyncAccessToken) {
                                return 'Access Token 验证错误';
                              }
                              return null;
                            },
                            onChanged: (value) {
                              this._accessToken = value;
                              this._isInvalidAsyncAccessToken = false;
                            },
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 16.0),
                            child: SizedBox(
                              width: double.infinity,
                              child: Consumer<Session>(
                                builder: (context, session) {
                                  return RaisedButton(
                                    color: Theme.of(context).accentColor,
                                    textColor: Colors.white,
                                    onPressed: () async {
                                      // Validate will return true if the form is valid, or false if
                                      // the form is invalid.
                                      this.submit(session);
                                    },
                                    child: Text(
                                        this._isSubmitting ? '登录中...' : '登录'),
                                  );
                                },
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Container(
                  height: 50,
                  child: Center(
                    child: GestureDetector(
                      child: Text('如何获取 Access Token？'),
                      onTap: () {
                        showDialog<void>(
                          context: context,
                          barrierDismissible: false, // user must tap button!
                          builder: (BuildContext context) {
                            return AlertDialog(
                              content: SingleChildScrollView(
                                child: Text(
                                    '在 CNode 社区网站端登录您的账户，然后在右上角找到「设置」按钮，点击进入后将页面滑动到最底部来查看您的 Access Token'),
                              ),
                              actions: <Widget>[
                                FlatButton(
                                  child: Text('确定'),
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                ),
                              ],
                            );
                          },
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
