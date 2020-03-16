import 'package:json_annotation/json_annotation.dart';
import 'package:cnodejs_flutter/entities/Author.dart';
import 'package:cnodejs_flutter/entities/Topic.dart';
import 'package:cnodejs_flutter/entities/Reply.dart';

part 'Message.g.dart';

@JsonSerializable(explicitToJson: true)
class Message {
  String id;

  @JsonKey(name: 'type')
  String type;

  @JsonKey(name: 'has_read')
  bool hasRead;

  @JsonKey(name: 'author')
  Author author;

  @JsonKey(name: 'topic')
  Topic topic;

  @JsonKey(name: 'reply')
  Reply reply;

  Message(
    this.id,
    this.type,
    this.hasRead,
    this.author,
    this.topic,
    this.reply,
  );

  /// A necessary factory constructor for creating a new Message instance
  /// from a map. Pass the map to the generated `_$MessageFromJson()` constructor.
  /// The constructor is named after the source class, in this case, Message.
  factory Message.fromJson(Map<String, dynamic> json) =>
      _$MessageFromJson(json);

  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$MessageToJson`.
  Map<String, dynamic> toJson() => _$MessageToJson(this);
}
