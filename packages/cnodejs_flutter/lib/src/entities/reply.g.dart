// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'reply.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Reply _$ReplyFromJson(Map<String, dynamic> json) {
  return Reply(json['id'] as String, json['author'], json['content'] as String,
      json['is_uped'] as bool, json['create_at'] as String);
}

Map<String, dynamic> _$ReplyToJson(Reply instance) => <String, dynamic>{
      'id': instance.id,
      'author': instance.author,
      'content': instance.content,
      'is_uped': instance.isUped,
      'create_at': instance.createAt
    };
