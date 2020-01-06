import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:cnodejs_flutter/entities/Reply.dart';
import 'package:cnodejs_flutter/entities/Topic.dart';

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

  Topic _data;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(microseconds: 0), () {
      _refreshKey.currentState.show();
    });
  }

  Future<void> _loadData() async {
    try {
      var response = await http.get(
        Uri.encodeFull(
            'https://cnodejs.org/api/v1/topic/${this.widget.arguments.id}?mdrender=false'),
        headers: {'Accept': 'application/json'},
      );
      var responseJSON = json.decode(response.body);
      setState(() {
        // TODO: 判断是否加载成功
        Map<String, dynamic> responseData = responseJSON['data'];
        responseData['author']['id'] = responseData['author_id'];
        _data = Topic.fromJson(responseData);
      });
    } catch (e) {
      // TODO: 提示加载失败
    }
  }

  Future<void> _refresh() async {
    await this._loadData();
  }

  Widget _buildReplyItem(BuildContext context, int index) {
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('话题'),
      ),
      body: RefreshIndicator(
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
                    SliverToBoxAdapter(
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
                          padding: EdgeInsets.symmetric(
                              horizontal: 15, vertical: 10),
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
                                    Container(
                                      margin: EdgeInsets.only(left: 15),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: <Widget>[
                                          Text(_data.author.loginname),
                                          Text(
                                            _data.createAt,
                                            style: Theme.of(context)
                                                .textTheme
                                                .caption,
                                          ),
                                        ],
                                      ),
                                    )
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
                    ),
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
                        this._buildReplyItem,
                        childCount:
                            _data.replies == null ? 0 : _data.replies.length,
                      ),
                    ),
                  ],
          ),
        ),
      ),
    );
  }
}
