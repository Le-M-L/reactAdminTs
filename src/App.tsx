
import React, { Suspense } from 'react';
import { Spin } from 'antd';
//HashRouter最外层必须由它包裹
//Link用于点击跳转
//Routes路由唯一匹配
//Route配置路由规则
//Navigate跳转错误显示的页面
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { layoutRouteList } from './router/utils';
import { routers } from "./router/index";

console.log(routers)
function App() {
  return (
    <Router>
    {/* Suspense 优化页面交互 */}
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Routes>
        {/* 挂载路由 */}
        {/* <Route path="/admin" render={(routeProps) => <App {...routeProps} />} /> */}
        {/* 除了admin的其他路由 路由所有属性全都赋值下去 */}
        {routers.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        {/* 找不到路径就使用404 */}
        {/* <Navigate to="/login" replace  /> */}
        {/* <Navigate to="/404" /> */}
      </Routes>
    </Suspense>
  </Router>
  );
}

export default App;
