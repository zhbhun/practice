import { Schema } from 'redumd';

export const author = new Schema('authors');
export const topic = new Schema('topics', {
  author: author.entity,
});
