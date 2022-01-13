import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//HashRouter最外层必须由它包裹
//Link用于点击跳转
//Switch路由唯一匹配
//Route配置路由规则
//Redirect跳转错误显示的页面
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppProviders } from './components/Application';
import store from './store';
import App from './App';
import './design/index.less';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const Main = () => {
  return (
    <Provider store={store}>
    <Router>
        <Suspense>
            <AppProviders>
                <Switch>
                    {/* 挂载路由 */}
                    <Route path="/admin" render={(routeProps) => <App {...routeProps} />} />
                    {/* 除了admin的其他路由 路由所有属性全都赋值下去 */}
                    {mainRoutes.map((route) => (
                        <Route key={route.path} {...route} />
                    ))}
                    {/* 找不到路径就使用404 */}
                    <Redirect to="/login" exact from="/" />
                    <Redirect to="/404" />
                </Switch>
            </AppProviders>
        </Suspense>
    </Router>
</Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

