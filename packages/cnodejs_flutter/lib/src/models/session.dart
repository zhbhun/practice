import 'package:flutter/foundation.dart';
import 'package:cnodejs_flutter/entities.dart';

class Session extends ChangeNotifier {
  static Session _instance;

  static Session getInstance() {
    if (Session._instance == null) {
      Session._instance = Session();
    }
    return Session._instance;
  }

  Author _user;
  String _accessToken;

  bool get isLogin => this._user != null && this._accessToken != null;

  Author get user => this._user;

  String get accessToken => this._accessToken;

  void login({Author user, String accessToken}) {
    this._user = user;
    this._accessToken = accessToken;
    this.notifyListeners();
  }

  void logout() {
    this._user = null;
    this._accessToken = null;
    this.notifyListeners();
  }
}
