import { entities, DetailPage } from 'redumd';
import * as api from 'cnodejs.api';
import * as schemas from '../schemas';

class TopicDetail extends DetailPage {
  constructor(namespace = '') {
    super(`TopicDetail/${namespace}`, {
      api: id =>
        api.loadTopicDetail(id).then(({ author, author_id, ...data }) => ({
          data: {
            ...data,
            author: {
              ...author,
              id: author_id,
            },
          },
        })),
      entities,
      schema: schemas.topic,
    });

    this.getTopic = state => {
      const entitiesState = entities.getState(state);
      const articleEntity = this.getDetail(state);
      return {
        ...articleEntity,
        author: articleEntity
          ? schemas.author.getEntity(entitiesState, articleEntity.author)
          : null,
      };
    };
  }
}

export default TopicDetail;
