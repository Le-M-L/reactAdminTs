import React, { Component, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// 页面切换
export function useGo(WrapComponent: ReactNode) {
  const navigate = useNavigate();
  console.log(navigate);
  return WrapComponent;
}
