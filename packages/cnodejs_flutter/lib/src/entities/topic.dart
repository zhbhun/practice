import 'package:json_annotation/json_annotation.dart';
import 'author.dart';
import 'reply.dart';

part 'topic.g.dart';

@JsonSerializable(explicitToJson: true)
class Topic {
  String id;
  String tab;
  bool good;
  bool top;
  String title;
  String content;
  @JsonKey(name: 'is_collect')
  bool isCollect;
  @JsonKey(name: 'last_reply_at')
  String lastReplyAt;
  @JsonKey(name: 'reply_count')
  int replyCount;
  @JsonKey(name: 'visit_count')
  int visitCount;
  @JsonKey(name: 'create_at')
  String createAt;
  Author author;
  List<Reply> replies;

  Topic(
    this.id,
    this.tab,
    this.good,
    this.top,
    this.title,
    this.content,
    this.isCollect,
    this.lastReplyAt,
    this.replyCount,
    this.visitCount,
    this.createAt,
    this.author,
    this.replies,
  );

  /// A necessary factory constructor for creating a new Topic instance
  /// from a map. Pass the map to the generated `_$TopicFromJson()` constructor.
  /// The constructor is named after the source class, in this case, Topic.
  factory Topic.fromJson(Map<String, dynamic> json) => _$TopicFromJson(json);

  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$TopicToJson`.
  Map<String, dynamic> toJson() => _$TopicToJson(this);
}
