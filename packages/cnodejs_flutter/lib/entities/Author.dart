import 'package:json_annotation/json_annotation.dart';
import 'package:cnodejs_flutter/entities/Topic.dart';

part 'Author.g.dart';

@JsonSerializable()
class Author {
  String id;

  String loginname;

  int score;

  @JsonKey(name: 'avatar_url')
  String avatarURL;

  @JsonKey(name: 'recent_topics')
  List<Topic> recentTopics;

  @JsonKey(name: 'recent_replies')
  List<Topic> recentReplies;

  @JsonKey(name: 'collect_topics')
  List<Topic> collectTopics;

  @JsonKey(name: 'create_at')
  String createAt;

  Author(this.id, this.loginname, this.avatarURL);

  /// A necessary factory constructor for creating a new Author instance
  /// from a map. Pass the map to the generated `_$AuthorFromJson()` constructor.
  /// The constructor is named after the source class, in this case, Author.
  factory Author.fromJson(Map<String, dynamic> json) => _$AuthorFromJson(json);

  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$AuthorToJson`.
  Map<String, dynamic> toJson() => _$AuthorToJson(this);
}
