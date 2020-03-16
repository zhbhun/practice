import 'package:flutter/material.dart';
import 'package:cnodejs_flutter/pages/HomePage.dart';
import 'package:cnodejs_flutter/pages/TopicDetailPage.dart';
import 'package:cnodejs_flutter/pages/AuthorDetailPage.dart';
import 'package:cnodejs_flutter/pages/LoginPage.dart';
import 'package:cnodejs_flutter/pages/message_list_page.dart';

typedef _WidgetBuilder<W, A> = W Function(BuildContext context, A arguments);

class _Route<W, A> {
  String name;
  _WidgetBuilder<W, A> builder;

  _Route({this.name, this.builder});
}

final _routes = [
  _Route<HomePage, Object>(
    name: '/',
    builder: (context, arguments) => HomePage(),
  ),
  _Route<TopicDetailPage, Object>(
    name: '/topic',
    builder: (context, arguments) => TopicDetailPage(arguments),
  ),
  _Route<AuthorDetailPage, Object>(
    name: '/author',
    builder: (context, arguments) => AuthorDetailPage(arguments),
  ),
  _Route<LoginPage, Object>(
    name: '/login',
    builder: (context, arguments) => LoginPage(),
  ),
  _Route<MessageListPage, Object>(
    name: '/messages',
    builder: (context, arguments) => MessageListPage(),
  ),
];

Widget routes(BuildContext context, RouteSettings settings) {
  _Route matchedRoute;
  _routes.any((route) {
    if (settings.name == route.name) {
      matchedRoute = route;
      return true;
    }
    return false;
  });
  // TODO: 没有匹配时需要提供个备选的路由组件
  return matchedRoute.builder(context, settings.arguments);
}
