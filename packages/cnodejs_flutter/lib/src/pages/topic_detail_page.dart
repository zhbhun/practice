import 'dart:async';
import 'package:flutter/material.dart';
import 'package:cnodejs_flutter/exceptions.dart';
import 'package:cnodejs_flutter/entities.dart';
import 'package:cnodejs_flutter/services.dart';
import 'package:cnodejs_flutter/models.dart';
import 'package:cnodejs_flutter/widgets.dart';

class TopicDetailPageArguments {
  final String id;

  TopicDetailPageArguments(this.id);
}

class TopicDetailPage extends StatefulWidget {
  final TopicDetailPageArguments arguments;

  TopicDetailPage(this.arguments);

  @override
  _TopicDetailPageState createState() => _TopicDetailPageState();
}

class _TopicDetailPageState extends State<TopicDetailPage> {
  final _refreshKey = GlobalKey<RefreshIndicatorState>();

  bool _loading = false;
  Exception _error;
  Topic _data;

  @override
  void initState() {
    super.initState();
    this._refresh();
    Session.getInstance().addListener(this._handleSessionChange);
  }

  @override
  void dispose() {
    super.dispose();
    Session.getInstance().removeListener(this._handleSessionChange);
  }

  void _handleSessionChange() {
    if (this._refreshKey.currentState != null) {
      this._refreshKey.currentState.show();
    } else {
      this._refresh();
    }
  }

  Future<void> _loadData() async {
    setState(() {
      this._loading = true;
      this._error = null;
    });
    try {
      var topic =
          await DataService.getInstance().getTopic(this.widget.arguments.id);
      setState(() {
        this._loading = false;
        _data = topic;
      });
    } catch (e) {
      setState(() {
        this._loading = false;
        this._error = e;
      });
    }
  }

  Future<void> _refresh() async {
    await this._loadData();
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
          child: Icon(Icons.reply),
        );
      },
    );
  }

  Widget buildReplyItem(BuildContext context, int index) {
    Reply reply = _data.replies[index];
    return Container(
      color: Colors.white,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Divider(),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
            child: Row(
              children: <Widget>[
                ClipOval(
                  child: Image.network(
                    reply.author.avatarURL,
                    width: 40,
                    height: 40,
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(left: 15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(reply.author.loginname),
                      Text(reply.createAt),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
            child:
                Text(reply.content, style: Theme.of(context).textTheme.body1),
          ),
        ],
      ),
    );
  }

  Widget buildCollectBtn() {
    return Consumer<Session>(
      builder: (context, session) {
        return IconButton(
          icon: Icon(session.isLogin && _data.isCollect
              ? Icons.favorite
              : Icons.favorite_border),
          onPressed: () async {
            if (!session.isLogin) {
              showDialog<void>(
                context: context,
                barrierDismissible: false,
                // user must tap button!
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
              try {
                DataService.getInstance().collectTopic(this._data.id);
                setState(() {
                  _data.isCollect = !_data.isCollect;
                });
              } catch (e) {
                if (e is HTTPException) {
                  HTTPException httpException = e;
                  Scaffold.of(context).showSnackBar(
                    SnackBar(
                      content: Text(httpException.message),
                    ),
                  );
                } else {
                  Scaffold.of(context).showSnackBar(
                    SnackBar(
                      content: Text('操作失败'),
                    ),
                  );
                }
              }
            }
          },
        );
      },
    );
  }

  Widget buildContent() {
    return SliverToBoxAdapter(
      child: Card(
        elevation: 1,
        margin: EdgeInsets.only(
          left: 0,
          top: 0,
          right: 0,
          bottom: 15,
        ),
        shape: RoundedRectangleBorder(),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                padding: EdgeInsets.only(
                  bottom: 15,
                ),
                child: Text(
                  this._data.title,
                  style: Theme.of(context).textTheme.title,
                ),
              ),
              Container(
                padding: EdgeInsets.only(
                  bottom: 15,
                ),
                child: Row(
                  children: <Widget>[
                    ClipOval(
                      child: Image.network(
                        _data.author.avatarURL,
                        width: 32,
                        height: 32,
                      ),
                    ),
                    Expanded(
                      child: Container(
                        margin: EdgeInsets.only(left: 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(_data.author.loginname),
                            Text(
                              _data.createAt,
                              style: Theme.of(context).textTheme.caption,
                            ),
                          ],
                        ),
                      ),
                    ),
                    this.buildCollectBtn(),
                  ],
                ),
              ),
              Container(
                child: Text(
                  _data.content,
                  style: Theme.of(context).textTheme.body1,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget buildBody() {
    return RefreshIndicator(
      key: this._refreshKey,
      onRefresh: this._refresh,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.grey.shade100,
        ),
        child: CustomScrollView(
          slivers: this._data == null
              ? []
              : <Widget>[
                  this.buildContent(),
                  SliverToBoxAdapter(
                    child: Container(
                      color: Colors.white,
                      height: 50,
                      padding: EdgeInsets.symmetric(
                        horizontal: 15,
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text('${_data.replies.length}条回复',
                              style: Theme.of(context).textTheme.title),
                        ],
                      ),
                    ),
                  ),
                  SliverList(
                    delegate: SliverChildBuilderDelegate(
                      this.buildReplyItem,
                      childCount:
                          _data.replies == null ? 0 : _data.replies.length,
                    ),
                  ),
                ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('话题'),
      ),
      body: this._data == null
          ? PageIndicator(
              loading: this._loading,
              exception: this._error,
              onRetry: this._refresh,
            )
          : this.buildBody(),
      floatingActionButton: this.buildFloatingActionButton(),
    );
  }
}
