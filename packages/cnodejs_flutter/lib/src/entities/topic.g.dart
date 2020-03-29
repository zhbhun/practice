// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'topic.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Topic _$TopicFromJson(Map<String, dynamic> json) {
  return Topic(
      json['id'] as String,
      json['tab'] as String,
      json['good'] as bool,
      json['top'] as bool,
      json['title'] as String,
      json['content'] as String,
      json['is_collect'] as bool,
      json['last_reply_at'] as String,
      json['reply_count'] as int,
      json['visit_count'] as int,
      json['create_at'] as String,
      json['author'] == null
          ? null
          : Author.fromJson(json['author'] as Map<String, dynamic>),
      (json['replies'] as List)
          ?.map((e) =>
              e == null ? null : Reply.fromJson(e as Map<String, dynamic>))
          ?.toList());
}

Map<String, dynamic> _$TopicToJson(Topic instance) => <String, dynamic>{
      'id': instance.id,
      'tab': instance.tab,
      'good': instance.good,
      'top': instance.top,
      'title': instance.title,
      'content': instance.content,
      'is_collect': instance.isCollect,
      'last_reply_at': instance.lastReplyAt,
      'reply_count': instance.replyCount,
      'visit_count': instance.visitCount,
      'create_at': instance.createAt,
      'author': instance.author?.toJson(),
      'replies': instance.replies?.map((e) => e?.toJson())?.toList()
    };
