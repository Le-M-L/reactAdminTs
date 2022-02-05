import React, { Component } from "react";
import { Layout } from "antd";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";
import LayoutFooter from "./Footer";
import styles from './layouts.module.less';
console.log(styles)
export default class index extends Component {
  render() {
    return (
      <Layout className={styles.defaultLayout} >
        <LayoutHeader/>
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    );
  }
}
