// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Message.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Message _$MessageFromJson(Map<String, dynamic> json) {
  return Message(
      json['id'] as String,
      json['type'] as String,
      json['has_read'] as bool,
      json['author'] == null
          ? null
          : Author.fromJson(json['author'] as Map<String, dynamic>),
      json['topic'] == null
          ? null
          : Topic.fromJson(json['topic'] as Map<String, dynamic>),
      json['reply'] == null
          ? null
          : Reply.fromJson(json['reply'] as Map<String, dynamic>));
}

Map<String, dynamic> _$MessageToJson(Message instance) => <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'has_read': instance.hasRead,
      'author': instance.author?.toJson(),
      'topic': instance.topic?.toJson(),
      'reply': instance.reply?.toJson()
    };
