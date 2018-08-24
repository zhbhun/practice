import Home from './pages/Home';
import Topic from './pages/Topic';
import User from './pages/User';
import Login from './pages/Login';
import Message from './pages/Message';
import Setting from './pages/Setting';

export default [
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    path: '/topic/:id',
    component: Topic
  },
  {
    path: '/user/:id',
    component: User
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/setting',
    component: Setting
  }
];
