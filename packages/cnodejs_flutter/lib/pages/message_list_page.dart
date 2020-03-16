import 'dart:async';
import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:cnodejs_flutter/entities/Message.dart';
import 'package:cnodejs_flutter/models/session.dart';
import 'package:cnodejs_flutter/widgets/provider.dart';
import 'package:cnodejs_flutter/pages/TopicDetailPage.dart';
import 'package:cnodejs_flutter/pages/AuthorDetailPage.dart';

class MessageListPage extends StatefulWidget {
  @override
  _MessageListPageState createState() => _MessageListPageState();
}

class _MessageListPageState extends State<MessageListPage> {
  final _refreshKey = GlobalKey<RefreshIndicatorState>();

  bool _loading = false;
  List<Message> _data;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(microseconds: 0), () {
      _refreshKey.currentState.show();
    });
    Session.getInstance().addListener(this._handleSessionChange);
  }

  @override
  void dispose() {
    super.dispose();
    Session.getInstance().removeListener(this._handleSessionChange);
  }

  Future<void> _refresh() async {
    if (!Session.getInstance().isLogin) {
      this._data = [];
      this._loading = false;
      return;
    }
    setState(() {
      _loading = true;
    });

    try {
      var response = await http.get(
        Uri.encodeFull('https://cnodejs.org/api/v1/messages?mdrender=false'),
        headers: {'Accept': 'application/json'},
      );
      var responseJSON = json.decode(response.body);
      setState(() {
        // TODO: 判断是否加载成功
        List<dynamic> responseData = responseJSON['data'];
        Iterable<Message> data = responseData.map((item) {
          return Message.fromJson(item);
        });
        this._data = data.toList();
      });
    } catch (e) {
      setState(() {
        _loading = false;
      });
    }
  }

  void _handleSessionChange() {
    this._refresh();
  }

  Widget buildListItem(BuildContext context, int index) {
    Message message = _data[index];
    return Card(
        elevation: 3,
        margin: EdgeInsets.only(bottom: 10),
        shape: RoundedRectangleBorder(),
        child: GestureDetector(
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  margin: EdgeInsets.only(bottom: 5),
                  child: Text(
                    // Read the name field value and set it in the Text widget
                    message.topic.title,
                    textAlign: TextAlign.left,
                    // set some style to text
                    style: TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.w500,
                      height: 1.5,
                    ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(bottom: 5),
                  child: Row(
                    children: [
                      GestureDetector(
                        onTap: () {
                          Navigator.pushNamed(
                            context,
                            '/author',
                            arguments: AuthorDetailPageArguments(
                                message.author.loginname),
                          );
                        },
                        child: Container(
                          margin: EdgeInsets.only(right: 10),
                          width: 32,
                          height: 32,
                          child: ClipOval(
                            child: Image.network(
                              message.author?.avatarURL,
                              width: 32,
                              height: 32,
                              fit: BoxFit.contain,
                            ),
                          ),
                          decoration: BoxDecoration(
                            color: Colors.grey.shade100,
                            borderRadius: new BorderRadius.all(
                              new Radius.circular(16),
                            ),
                          ),
                        ),
                      ),
                      Text(message.author?.loginname)
                    ],
                  ),
                ),
                Text(message.reply.content)
              ],
            ),
          ),
          onTap: () {
            Navigator.pushNamed(
              context,
              '/topic',
              arguments: TopicDetailPageArguments(message.topic.id),
            );
          },
        ));
  }

  Widget buildFloatingActionButton() {
    return Consumer<Session>(
      builder: (context, session) {
        return FloatingActionButton(
          onPressed: () {
            if (!session.isLogin) {
              showDialog<void>(
                context: context,
                barrierDismissible: false, // user must tap button!
                builder: (BuildContext context) {
                  return AlertDialog(
                    content: SingleChildScrollView(
                      child: Text('该操作需要登录账户，是否现在登录？'),
                    ),
                    actions: <Widget>[
                      FlatButton(
                        child: Text('取消'),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                      FlatButton(
                        child: Text('确定'),
                        onPressed: () {
                          Navigator.of(context).pop();
                          Navigator.pushNamed(context, '/login');
                        },
                      ),
                    ],
                  );
                },
              );
            } else {
              Scaffold.of(context).showSnackBar(
                SnackBar(
                  content: Text('暂时不支持该功能！'),
                ),
              );
            }
          },
          child: Icon(Icons.done_all),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('消息'),
      ),
      body: RefreshIndicator(
        key: _refreshKey,
        onRefresh: _refresh,
        child: ListView.builder(
          itemCount: _data != null ? _data.length : 0,
          itemBuilder: this.buildListItem,
        ),
      ),
      floatingActionButton: this.buildFloatingActionButton(),
    );
  }
}
