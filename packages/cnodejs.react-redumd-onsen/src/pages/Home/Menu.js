import React from 'react';
import { List, ListItem } from 'react-onsenui';

const menus = [
  {
    tab: '',
    icon: '',
    title: '全部',
  },
  {
    tab: 'good',
    icon: '',
    title: '精华',
  },
  {
    tab: 'share',
    icon: '',
    title: '分享',
  },
  {
    tab: 'ask',
    icon: '',
    title: '问答',
  },
  {
    tab: 'job',
    icon: '',
    title: '招聘',
  },
];

export default ({ onClick }) => (
  <List
    dataSource={menus}
    renderRow={(menu, index) => {
      return (
        <ListItem
          key={index}
          onClick={() => {
            onClick(menu.tab);
          }}
        >
          {menu.title}
        </ListItem>
      );
    }}
  />
);
