import React, { Component } from "react";

interface ContentContextValue {
}
const contentContextValue = {
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
