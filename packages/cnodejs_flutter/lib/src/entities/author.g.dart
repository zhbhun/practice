// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'author.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Author _$AuthorFromJson(Map<String, dynamic> json) {
  return Author(json['id'] as String, json['loginname'] as String,
      json['avatar_url'] as String)
    ..score = json['score'] as int
    ..recentTopics = (json['recent_topics'] as List)
        ?.map(
            (e) => e == null ? null : Topic.fromJson(e as Map<String, dynamic>))
        ?.toList()
    ..recentReplies = (json['recent_replies'] as List)
        ?.map(
            (e) => e == null ? null : Topic.fromJson(e as Map<String, dynamic>))
        ?.toList()
    ..collectTopics = (json['collect_topics'] as List)
        ?.map(
            (e) => e == null ? null : Topic.fromJson(e as Map<String, dynamic>))
        ?.toList()
    ..createAt = json['create_at'] as String;
}

Map<String, dynamic> _$AuthorToJson(Author instance) => <String, dynamic>{
      'id': instance.id,
      'loginname': instance.loginname,
      'score': instance.score,
      'avatar_url': instance.avatarURL,
      'recent_topics': instance.recentTopics,
      'recent_replies': instance.recentReplies,
      'collect_topics': instance.collectTopics,
      'create_at': instance.createAt
    };
