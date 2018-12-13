- 依赖

  - history
  - path-to-regexp
  - matchPath

- RouterNavigator

  - routes[]

    - component
    - path
    - exact
    - strict

- RouterNavigator$instance

  - popPage()
  - pushPage(path)
  - resetPage(path)

  实际应用

  - 访问首页：initialRoute={path:'/'}
  
    1. 点击某个话题：pushPage('/topic/:id') + history.push('/topic/:id')
    2. 返回：popPage() + history.goBack();
    3. 前进：pushPage('/topic/:id')
    4. 后退：popPage()
    5. 后退：退出应用

  - 访问详情页：initialRouteStack=[{path:'/'}, {path:'/topic/:id'}]

    1. 返回：popPage() + history.replace('/')
    2. 前进：无响应
    3. 后退：退出应用

  - 
