import 'dart:async';
import 'package:flutter/material.dart';
import 'package:cnodejs_flutter/widgets.dart';
import 'package:cnodejs_flutter/entities.dart';
import 'package:cnodejs_flutter/services.dart';
import 'topic_detail_page.dart';

class AuthorDetailPageArguments {
  final String loginname;

  AuthorDetailPageArguments(this.loginname);
}

class AuthorDetailPage extends StatefulWidget {
  final AuthorDetailPageArguments arguments;

  AuthorDetailPage(this.arguments);

  @override
  _AuthorDetailPageState createState() => _AuthorDetailPageState();
}

class _AuthorDetailPageState extends State<AuthorDetailPage> {
  final _refreshKey = GlobalKey<CustomRefreshIndicatorState>();

  Author _data;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(microseconds: 0), () {
      _refreshKey.currentState.show();
    });
  }

  Future<void> _loadData() async {
    try {
      var author = await DataService.getInstance()
          .getAuthor(this.widget.arguments.loginname);
      this.setState(() {
        this._data = author;
      });
    } catch (e) {
      // TODO: 提示加载失败
      print(e);
    }
  }

  Future<void> _refresh() async {
    await this._loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: DefaultTabController(
        length: 3,
        child: CustomRefreshIndicator(
          key: _refreshKey,
          notificationPredicate: (_) => true,
          // 必须设置为 true 否则无法触发下拉刷新
          offset: 280,
          // 默认从顶部出现刷新指示器，设置偏移量后可以从 tab 栏下开始出现
          onRefresh: this._refresh,
          child: NestedScrollView(
            headerSliverBuilder:
                (BuildContext context, bool innerBoxIsScrolled) {
              return <Widget>[
                SliverOverlapAbsorber(
                  handle:
                      NestedScrollView.sliverOverlapAbsorberHandleFor(context),
                  child: SliverAppBar(
                    pinned: true,
                    floating: false,
                    expandedHeight: 250.0,
                    forceElevated: innerBoxIsScrolled,
                    flexibleSpace: FlexibleSpaceBar(
                      background: Container(
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage(
                              'assets/images/bg_user_detail_header.png',
                            ),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            ClipOval(
                              child: Container(
                                color: Colors.grey.shade100,
                                child: this._data != null
                                    ? Image.network(
                                        this._data.avatarURL,
                                        width: 80,
                                        height: 80,
                                      )
                                    : Image.asset(
                                        'assets/images/pic_placeholder.png',
                                        width: 80,
                                        height: 80,
                                      ),
                              ),
                            ),
                            Container(
                              margin: EdgeInsets.only(top: 10, bottom: 5),
                              child: Text(
                                  this._data != null
                                      ? this._data.loginname
                                      : '',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                  )),
                            ),
                            Container(
                              margin: EdgeInsets.only(bottom: 20),
                              child: Text(
                                  this._data != null
                                      ? '${this._data.loginname}@github.com'
                                      : '',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 15,
                                  )),
                            ),
                            Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 15, vertical: 0),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: <Widget>[
                                  Text(
                                    this._data != null
                                        ? this._data.createAt ?? ''
                                        : '',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 14,
                                    ),
                                  ),
                                  Text(
                                    this._data != null
                                        ? '积分：${this._data.score ?? 0}'
                                        : '',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 14,
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    bottom: TabBar(
                      tabs: <Widget>[
                        Tab(text: '最近回复'),
                        Tab(text: '最新发布'),
                        Tab(text: '话题收藏'),
                      ],
                    ),
                  ),
                ),
              ];
            },
            body: TabBarView(
              children: <Widget>[
                _TopicList(
                  name: 'recent_replies',
                  topics: this._data?.recentReplies,
                ),
                _TopicList(
                  name: 'recent_topics',
                  topics: this._data?.recentTopics,
                ),
                _TopicList(
                  name: 'collect_topics',
                  topics: this._data?.collectTopics,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _TopicList extends StatelessWidget {
  final String name;
  final List<Topic> topics;

  _TopicList({this.name, this.topics});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      bottom: false,
      child: Builder(
        builder: (BuildContext context) {
          return CustomScrollView(
            key: PageStorageKey<String>(this.name),
            slivers: <Widget>[
              SliverOverlapInjector(
                handle:
                    NestedScrollView.sliverOverlapAbsorberHandleFor(context),
              ),
              SliverFixedExtentList(
                itemExtent: 80.0,
                delegate: SliverChildBuilderDelegate(
                  (BuildContext context, int index) {
                    var topic = this.topics[index];
                    return GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(
                          context,
                          '/topic',
                          arguments: TopicDetailPageArguments(topic.id),
                        );
                      },
                      child: Container(
                        height: 80,
                        padding:
                            EdgeInsets.symmetric(horizontal: 15, vertical: 0),
                        child: Column(
                          children: <Widget>[
                            Expanded(
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: <Widget>[
                                  GestureDetector(
                                    onTap: () {
                                      Navigator.pushNamed(
                                        context,
                                        '/author',
                                        arguments: AuthorDetailPageArguments(
                                          topic.author.loginname,
                                        ),
                                      );
                                    },
                                    child: ClipOval(
                                      child: Container(
                                        color: Colors.grey.shade100,
                                        child: Image.network(
                                          topic.author.avatarURL,
                                          width: 36,
                                          height: 36,
                                        ),
                                      ),
                                    ),
                                  ),
                                  Expanded(
                                    child: Container(
                                      margin: EdgeInsets.only(left: 10),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: <Widget>[
                                          Container(
                                            margin: EdgeInsets.only(bottom: 5),
                                            child: Text(
                                              topic.title,
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .subtitle,
                                            ),
                                          ),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                              Text(
                                                  topic.author.loginname ?? ''),
                                              Text(topic.lastReplyAt ?? ''),
                                            ],
                                          )
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Divider(),
                          ],
                        ),
                      ),
                    );
                  },
                  childCount: this.topics == null ? 0 : this.topics.length,
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
