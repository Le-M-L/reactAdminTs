import React, { Suspense } from "react";
import { Spin } from "antd";
import { AppProvider } from "@/components/Application";
//HashRouter 最外层必须由它包裹
//Link 用于点击跳转
//Routes 路由唯一匹配
//Route 配置路由规则
//Navigate 跳转错误显示的页面
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// import { layoutRouteList } from './router/utils';
import { routers } from "./router/index";
function App() {
  return (
    <HashRouter>
      {/* Suspense 优化页面交互 */}
      <Suspense fallback={<Spin size="large" className="layout__loading" />}>
        <AppProvider>
          <Routes>
            {/* 挂载路由 */}
            {/* <Route path="/admin" render={(routeProps) => <App {...routeProps} />} /> */}
            {/* 除了admin的其他路由 路由所有属性全都赋值下去 */}
            {routers.map((route) => (
              <Route
                key={route.path}
                {...route}
                element={
                  route.redirect ? (
                    <Navigate to={route.redirect} />
                  ) : (
                    <route.element />
                  )
                }
              />
            ))}
          </Routes>
        </AppProvider>
      </Suspense>
    </HashRouter>
  );
}

export default App;
