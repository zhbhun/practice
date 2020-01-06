import 'package:json_annotation/json_annotation.dart';
import './Author.dart';

part 'Reply.g.dart';

@JsonSerializable()
class Reply {
  String id;
  Author author;
  String content;
  @JsonKey(name: 'is_uped')
  bool isUped;
  @JsonKey(name: 'create_at')
  String createAt;

  Reply(this.id, this.author, this.content, this.isUped, this.createAt);

  factory Reply.fromJson(Map<String, dynamic> json) => _$ReplyFromJson(json);

  Map<String, dynamic> toJson() => _$ReplyToJson(this);
}
