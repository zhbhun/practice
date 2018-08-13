CNodejs
========

- https://cnodejs.org/
- https://github.com/shinygang/Vue-cnodejs
- https://github.com/soliury/noder-react-native
- https://github.com/lanceli/cnodejs-ionic
- https://github.com/cnodejs/egg-cnode
- https://github.com/lzxb/vue-cnode
- https://github.com/lzxb/react-cnode

## 功能

- 主题信息流
- 主题详情
- 新增主题
- 修改主题
- 收藏主题
- 收藏列表
- 新增评论
- 评论点赞
- 用户详情
- 用户登录
- 消息列表
- 标记消息

## 接口

### 主题

#### 主题列表

- 地址： `https://cnodejs.org/api/v1/topics`
- 方法：`get`
- 参数：

    - page：Number，页码
    - tab：String，主题分类（ask、share、job 和 good）
    - limit：Number，每一页的主题数量
    - mdrender：String，当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。

- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": "",
      "data": [{
        "author": {
          "avatar_url": "https://...", // 头像地址
          "loginname": "nswbmw" // 用户名
        },
        "author_id": "5110f2bedf9e9fcc584e4677", // 用户 ID
        "content": "...", // 主题正文
        "create_at": "2018-02-28T08:02:07.081Z", // 创建时间
        "good": true, // 是否精华
        "id": "5a9661ff71327bb413bbff5b", // 主题 ID
        "last_reply_at": "2018-07-26T08:32:01.272Z", // 最后回复时间
        "reply_count": 91, // 回复数量
        "tab": "share", // 主题分类
        "title": "...", // 主题标题
        "top": true, // 是否置顶
        "visit_count": 17396 // 访问数量
      }]
    }
    ```

#### 主题详情

- 地址： `https://cnodejs.org/api/v1/topic/:id`
- 方法：`get`
- 参数：

    - mdrender：String，当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
    - accesstoken：String，当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。

- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": "",
      "data": {
        "author": {
          "avatar_url": "https://...", // 头像地址
          "loginname": "nswbmw" // 用户名
        },
        "author_id": "5110f2bedf9e9fcc584e4677", // 用户 ID
        "content": "...", // 主题正文
        "create_at": "2018-02-28T08:02:07.081Z", // 创建时间
        "good": true, // 是否精华
        "id": "5a9661ff71327bb413bbff5b", // 主题 ID
        "is_collect": true, // 是否收藏过
        "last_reply_at": "2018-07-26T08:32:01.272Z", // 最后回复时间
        "reply_count": 91, // 回复数量
        "tab": "share", // 主题分类
        "title": "...", // 主题标题
        "top": true, // 是否置顶
        "visit_count": 17396, // 访问数量
        "replies": [{
          "author": {
            "avatar_url": "https://", // 头像地址
            "loginname": "..." // 用户名
          },
          "content": "...", // 回复内容
          "create_at": "2018-02-28T08:44:31.120Z", // 回复时间
          "id": "5a966bef653c43b914685109", // 回复 ID
          "is_uped": false, // 是否点赞
          "reply_id": null // 回复 ID
        }]
      }
    }
    ```

#### 新建主题

- 地址： `https://cnodejs.org/api/v1/topics`
- 方法：`post`
- 参数：

    - accesstoken String 用户的 accessToken
    - title String 标题
    - tab String 目前有 ask share job dev。开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
    - content String 主体内容

- 响应

    ```json
    {
      "success": true,
      "error_msg": "",
      "topic_id": "5433d5e4e737cbe96dcef312"
    }
    ```

#### 编辑主题


- 地址： `https://cnodejs.org/api/v1/topics`
- 方法：`post`
- 参数：

    - accesstoken String 用户的 accessToken
    - topic_id String 主题id
    - title String 标题
    - tab String 目前有 ask share job
    - content String 主体内容

- 响应

    ```json
    {
      "success": true,
      "error_msg": "",
      "topic_id": "5433d5e4e737cbe96dcef312"
    }
    ``` 

### 收藏

#### 用户所收藏的主题

- 地址： `https://cnodejs.org/api/v1/topic_collect/:loginname`
- 方法：`get`
- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": "",
      "data": [{
        "author": {
          "avatar_url": "https://...", // 头像地址
          "loginname": "nswbmw" // 用户名
        },
        "author_id": "5110f2bedf9e9fcc584e4677", // 用户 ID
        "content": "...", // 主题正文
        "create_at": "2018-02-28T08:02:07.081Z", // 创建时间
        "good": true, // 是否精华
        "id": "5a9661ff71327bb413bbff5b", // 主题 ID
        "last_reply_at": "2018-07-26T08:32:01.272Z", // 最后回复时间
        "reply_count": 91, // 回复数量
        "tab": "share", // 主题分类
        "title": "...", // 主题标题
        "top": true, // 是否置顶
        "visit_count": 17396, // 访问数量
      }]
    }
    ```

#### 收藏主题

- 地址： `https://cnodejs.org/api/v1/topic_collect/collect`
- 方法：`post`
- 参数

    - accesstoken String 用户的 accessToken
    - topic_id String 主题的id

- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": ""
    }
    ```

#### 取消收藏主题

- 地址： `https://cnodejs.org/api/v1/topic_collect/de_collect`
- 方法：`post`
- 参数

    - accesstoken String 用户的 accessToken
    - topic_id String 主题的id

- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": ""
    }
    ```

### 评论

#### 新建评论

- 地址： `https://cnodejs.org/api/v1/topic/:topic_id/replies`
- 方法：`post`
- 参数

    - accesstoken String 用户的 accessToken
    - content String 评论的主体
    - reply_id String 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。

- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": "",
      "reply_id": "5433d5e4e737cbe96dcef312"
    }
    ```

### 为评论点赞

- 地址： `https://cnodejs.org/api/v1/reply/:reply_id/ups`
- 方法：`post`
- 参数

    - accesstoken String 用户的 accessToken

- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": "",
      "action": "down" // 接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。
    }
    ```

### 用户

#### 用户详情

- 地址： `https://cnodejs.org/api/v1/user/:loginname`
- 方法：`get`
- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": "",
      "data": {
        "avatar_url": "https://...",
        "create_at": "2012-09-09T05:26:58.319Z",
        "githubUsername": "...",
        "loginname": "...",
        "score": 0,
        "recent_replies": [{
          "author": {
            "avatar_url": "https://...",
            "loginname": "..."
          },
          "id": "...",
          "last_reply_at": "2018-07-31T04:11:04.751Z",
          "title": "..."
        }],
        "recent_topics": [{
          "author": {
            "avatar_url": "https://...",
            "loginname": "..."
          },
          "id": "5843092c3ebad99b336b1d48",
          "last_reply_at": "2016-12-04T13:57:30.730Z",
          "title": "..."
        }]
      }
    ```

#### 登录验证

- 地址： `https://cnodejs.org/api/v1/accesstoken`
- 方法：`post`
- 参数

    - accesstoken：String，用户的 accessToken

- 响应

    ```json
    {
      "success": true, // 是否成功
      "error_msg": "",
      "data": {
        "loginname": "...",
        "id": "...",
        "avatar_url": ""
      }
    ```

### 消息

#### 获取未读消息数

- 地址： `https://cnodejs.org/api/v1/message/count`
- 方法：`get`
- 参数

    - accesstoken String

- 响应

    ```json
    {
      "success": true,
      "error_msg": "",
      "data": 3
    }
    ```

#### 获取已读和未读消息

- 地址： `https://cnodejs.org/api/v1/messages`
- 方法：`get`
- 参数

    - accesstoken String
    - mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。

- 响应

    ```json
    {
      "success": true,
      "error_msg": "",
      "data": {
        "has_read_messages": [],
        "hasnot_read_messages": [{
          "id": "543fb7abae523bbc80412b26",
          "type": "at", // at|reply
          "has_read": false,
          "author": {
            "loginname": "alsotang",
            "avatar_url": "https://avatars.githubusercontent.com/u/1147375?v=2"
           },
          "topic": {
            "id": "542d6ecb9ecb3db94b2b3d0f",
            "title": "adfadfadfasdf",
            "last_reply_at": "2014-10-18T07:47:22.563Z"
          },
          "reply": {
            "id": "543fb7abae523bbc80412b24",
            "content": "[@alsotang](/user/alsotang) 哈哈",
            "ups": [],
            "create_at": "2014-10-16T12:18:51.566Z"
          }
        }]
      }
    }
    ```

#### 标记全部已读

- 地址： `https://cnodejs.org/api/v1/message/mark_all `
- 方法：`post`
- 参数

    - accesstoken String

- 响应

    ```json
    {
      "success": true,
      "error_msg": "",
      "marked_msgs": [{ "id": "544ce385aeaeb5931556c6f9" }]
    }
    ```

#### 标记单个消息为已读

- 地址： `https://cnodejs.org/api/v1/message/mark_one/:msg_id `
- 方法：`post`
- 参数

    - accesstoken String

- 响应

    ```json
    {
      "success": true,
      "error_msg": "",
      "marked_msg_id": "58ec7d39da8344a81eee0c14"
    }
    ```
