import React, { Component } from "react";
import { prefixCls } from "@/settings/designSetting";

interface ContentContextValue {
  prefixCls: string;
}
const contentContextValue = {
  prefixCls: prefixCls,
};

const { Provider, Consumer } =
  React.createContext<ContentContextValue>(contentContextValue);

class AppProvider extends Component {
  render() {
    return (
      <Provider value={contentContextValue}>{this.props.children}</Provider>
    );
  }
}
export { Consumer, AppProvider };
