import { Schema } from 'redumd';

export const author = new Schema('authors');
export const reply = new Schema('replies');
export const topic = new Schema('topics', {
  author: author.entity,
  replies: [reply.entity],
});
