import { normalize, schema } from 'normalizr';

export const user = new schema.Entity(
  'users',
  {},
  {
    idAttribute: 'loginname'
  }
);
export const reply = new schema.Entity('replies', {
  author: user
});
export const topic = new schema.Entity('topics', {
  author: user,
  replies: [reply]
});
export const message = new schema.Entity('messages', {
  author: user,
  topic: topic,
  reply: reply
});
user.define({
  recent_replies: [topic],
  recent_topics: [topic],
  collect_topics: [topic]
});

export const createUser = data => normalize(data, user);
export const createUsers = data => normalize(data, [user]);
export const createReply = data => normalize(data, reply);
export const createReplies = data => normalize(data, [reply]);
export const createTopic = data => normalize(data, topic);
export const createTopics = data => normalize(data, [topic]);
export const createMessages = data => normalize(data, [message]);
export const createMessage = data => normalize(data, message);
