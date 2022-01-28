import React, { Component, ReactNode } from "react";
import {  useNavigate, } from "react-router-dom"
import { Result, Button } from "antd";
import { ExceptionEnum } from "@/enums/exceptionEnum";
interface IProps {
  status?: "success" | "error" | "info" | "warning" | 404 | 403 | 500;
  title?: ReactNode;
  subTitle?: ReactNode;
}

interface MapValue {
  title: string;
  subTitle: string;
  btnText?: string;
  icon?: string;
  handler?: () => void;
  status?: string;
}
 class Exception extends Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  // }
  state = {
    statusMapRef: new Map<string | number, MapValue>(),
  };

  componentDidMount() {

    console.log(this)
    this.state.statusMapRef.set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: "403",
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: '抱歉，您无权访问此页面。',
      // btnText: props.full ? '返回登录' : '返回首页',
      // handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });
    
    this.state.statusMapRef.set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: "404",
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: '抱歉，您访问的页面不存在。',
      // btnText: props.full ? '返回登录' : '返回首页',
      // handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });

    this.state.statusMapRef.set(ExceptionEnum.ERROR, {
      title: "500",
      status: `${ExceptionEnum.ERROR}`,
      subTitle: '抱歉，服务器报告错误。',
      btnText: '返回首页',
      // handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });

    this.state.statusMapRef.set(ExceptionEnum.PAGE_NOT_DATA, {
      title: "当前页无数据",
      subTitle: '',
      btnText:'刷新'
      // handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });

    this.state.statusMapRef.set(ExceptionEnum.NET_WORK_ERROR, {
      title: "网络错误",
      subTitle: '抱歉，您的网络连接已断开，请检查您的网络！',
      btnText:'刷新',
      // handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });
  }
  render() {
    const { status, title, subTitle } = this.props;
    return (
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">
           </Button>,
        ]}
      />
    );
  }
}
export default Exception