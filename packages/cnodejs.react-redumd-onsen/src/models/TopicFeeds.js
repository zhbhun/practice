import { entities, ListPage } from 'redumd';
import * as api from 'cnodejs.api';
import { topic } from '../schemas';

class TopicFeeds extends ListPage {
  constructor(namespace = '') {
    super(`TopicFeeds/${namespace}`, {
      api: page => {
        return api.loadTopicList('', page, 15).then(data => {
          return {
            data: data.map(item => {
              const { author, author_id, ...topicItem } = item;
              topicItem.author = {
                ...author,
                id: author_id,
              };
              return topicItem;
            }),
            meta: {
              page,
              hasMore: data.length > 0,
            },
          };
        });
      },
      entities,
      schema: topic,
    });

    this.getTopics = state =>
      this.getData(state).map(id =>
        topic.getEntity(entities.getState(state), id)
      );
  }
}

export default TopicFeeds;
