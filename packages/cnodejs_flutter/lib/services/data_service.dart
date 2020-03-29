import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:cnodejs_flutter/exceptions/http_exception.dart';
import 'package:cnodejs_flutter/entities/Author.dart';
import 'package:cnodejs_flutter/entities/Message.dart';
import 'package:cnodejs_flutter/entities/Topic.dart';
import 'package:cnodejs_flutter/models/session.dart';

Future<dynamic> request(
  String url, {
  String method = 'GET',
  Map<String, String> headers,
  dynamic body,
  dynamic Function(http.Response response) responseTransformer,
}) async {
  http.Response response;
  try {
    switch (method) {
      case 'get':
      case 'GET':
        response = await http.get(url, headers: headers);
        break;
      case 'post':
      case 'POST':
        response = await http.post(url, headers: headers, body: body);
        break;
    }
  } catch (e) {
    throw HTTPNetworkException();
  }
  if (response.statusCode >= 500) {
    throw HTTPServerException(response.statusCode);
  }
  if (responseTransformer != null) {
    return responseTransformer(response);
  }
  Map<String, dynamic> responseJSON;
  try {
    responseJSON = json.decode(response.body);
  } catch (e) {
    throw HTTPFormatException();
  }
  if (responseJSON['success'] != true) {
    throw HTTPException(response.statusCode, responseJSON['error_msg']);
  }
  return responseJSON['data'];
}

class DataService {
  static DataService _instance;

  static DataService getInstance() {
    if (DataService._instance == null) {
      DataService._instance = new DataService();
    }
    return DataService._instance;
  }

  Future<List<Topic>> getTopics({tab, page, size = 15}) async {
    List<dynamic> responseData = await request(
        'https://cnodejs.org/api/v1/topics?mdrender=false&tab=$tab&page=$page&limit=$size',
        headers: {'Accept': 'application/json'});
    Iterable<Topic> data = responseData.map((item) {
      if (item['author'] != null) {
        item['author']['id'] = item['author_id'];
      }
      return Topic.fromJson(item);
    });
    return data.toList();
  }

  Future<Topic> getTopic(String id) async {
    var responseData = await request(
      'https://cnodejs.org/api/v1/topic/$id?mdrender=false',
      headers: {'Accept': 'application/json'},
    );
    responseData['author']['id'] = responseData['author_id'];
    return Topic.fromJson(responseData);
  }

  void collectTopic(String id) async {
    var session = Session.getInstance();
    if (!session.isLogin) {
      throw new HTTPException(401, '您还没有登录');
    }
    await request(
      'https://cnodejs.org/api/v1/topic_collect/collect',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: 'accesstoken=${session.accessToken}&topic_id=$id',
    );
  }

  Future<List<Message>> getMessages() async {
    var session = Session.getInstance();
    if (!session.isLogin) {
      throw new HTTPException(401, '您还没有登录');
    }
    var responseData = await request(
      'https://cnodejs.org/api/v1/messages?mdrender=false&accesstoken=${session.accessToken}',
      headers: {'Accept': 'application/json'},
    );
    List<dynamic> all = [];
    if (responseData['hasnot_read_messages'] is List) {
      all.addAll(responseData['hasnot_read_messages']);
    } else {
      throw new HTTPException(400, '数据加载失败');
    }
    if (responseData['has_read_messages'] is List) {
      all.addAll(responseData['has_read_messages']);
    } else {
      throw new HTTPException(400, '数据加载失败');
    }
    Iterable<Message> data = all.map((item) {
      return Message.fromJson(item);
    });
    List<Message> messages = data.toList();
    if (messages.length == 0) {
      throw new HTTPEmptyException();
    }
    return messages;
  }

  Future<dynamic> getAuthor(String loginname) async {
    var responseData = await request(
      'https://cnodejs.org/api/v1/user/$loginname',
      headers: {'Accept': 'application/json'},
    );
    var collectList =
        await request('https://cnodejs.org/api/v1/topic_collect/$loginname');
    responseData['collect_topics'] = collectList.map((item) {
      item['author']['id'] = item['author_id'];
      return item;
    }).toList();
    return Author.fromJson(responseData);
  }

  Future<Author> login(String accessToken) async {
    print(accessToken);
    var response = await request(
      'https://cnodejs.org/api/v1/accesstoken',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: 'accesstoken=$accessToken',
      responseTransformer: (response) {
        print(response.body);
        Map<String, dynamic> responseJSON;
        try {
          responseJSON = json.decode(response.body);
        } catch (e) {
          throw HTTPFormatException();
        }
        if (responseJSON['success'] != true) {
          throw HTTPException(response.statusCode, responseJSON['error_msg']);
        }
        return responseJSON;
      },
    );
    return Author.fromJson(response);
  }
}
