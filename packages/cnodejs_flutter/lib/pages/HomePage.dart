import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:cnodejs_flutter/entities/Topic.dart';
import './TopicDetailPage.dart';
import './AuthorDetailPage.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _refreshKey = GlobalKey<RefreshIndicatorState>();

  int _page = 1;
  bool _loading = false;
  List<Topic> _data;
  int _lastRefreshTime;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(microseconds: 0), () {
      _refreshKey.currentState.show();
    });
  }

  Future<void> _loadData({int page: 1}) async {
    var loadTime = DateTime.now().millisecondsSinceEpoch;
    setState(() {
      _loading = true;
      _lastRefreshTime =
          page == 1 ? DateTime.now().millisecondsSinceEpoch : _lastRefreshTime;
    });

    try {
      var response = await http.get(
        Uri.encodeFull(
            'https://cnodejs.org/api/v1/topics?mdrender=false&page=$page&limit=15'),
        headers: {'Accept': 'application/json'},
      );
      var responseJSON = json.decode(response.body);
      if (page > 1 && loadTime < _lastRefreshTime) {
        // 如果先后进行了分页加载和下拉刷新，那么需要忽略掉分页加载的数据
        return;
      }
      setState(() {
        // TODO: 判断是否加载成功
        _page = page;
        _loading = false;
        List<dynamic> responseData = responseJSON['data'];
        Iterable<Topic> data = responseData.map((item) {
          if (item['author'] != null) {
            item['author']['id'] = item['author_id'];
          }
          return Topic.fromJson(item);
        });
        if (page == 1) {
          _data = data.toList();
        } else {
          var newData = _data.sublist(0);
          newData.addAll(data);
          _data = newData;
        }
      });
    } catch (e) {
      setState(() {
        _loading = false;
      });
    }
  }

  Future<void> _refresh() async {
    await this._loadData();
  }

  void _loadMore() {
    // _loadMore 在 build 中发起，flutter 不允许直接在 build 里调用 setState，这里用过一个延迟来规避该问题
    Future.delayed(const Duration(microseconds: 0), () async {
      if (!_loading) {
        await this._loadData(page: _page + 1);
      }
    });
  }

  Widget buildListItem(BuildContext context, int index) {
    if (index >= _data.length) {
      _loadMore();
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Container(
            margin: EdgeInsets.only(top: 9, bottom: 9),
            width: 32,
            height: 32,
            child: CircularProgressIndicator(),
          ),
        ],
      );
    }
    var topic = _data[index];
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
                    topic.title,
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
                                topic.author.loginname),
                          );
                        },
                        child: Container(
                          margin: EdgeInsets.only(right: 10),
                          width: 32,
                          height: 32,
                          child: ClipOval(
                            child: Image.network(
                              topic.author?.avatarURL,
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
                      Text(topic.author?.loginname)
                    ],
                  ),
                ),
                Text(
                  topic.content.substring(
                    0,
                    topic.content.length > 100 ? 100 : topic.content.length - 1,
                  ),
                )
              ],
            ),
          ),
          onTap: () {
            Navigator.pushNamed(
              context,
              '/topic',
              arguments: TopicDetailPageArguments(topic.id),
            );
          },
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CNode 社区'),
      ),
      body: RefreshIndicator(
        key: _refreshKey,
        onRefresh: _refresh,
        child: ListView.builder(
          itemCount: _data == null || _data.length == 0 ? 0 : _data.length + 1,
          itemBuilder: this.buildListItem,
        ),
      ),
    );
  }
}
