import { Layout } from "antd";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";
import LayoutFooter from "./Footer";
import { useDesign } from "@/hooks/web/useDesign";
import styles from "./layouts.m.less";
console.log(styles)
const DefaultLayout = () => {
  const { prefixCls } = useDesign("default-layout");
  return (
    <Layout className={prefixCls}>
      <LayoutHeader />
      <LayoutContent />
      <LayoutFooter />
    </Layout>
  );
};

export default DefaultLayout;
