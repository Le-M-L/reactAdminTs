import { Layout } from "antd";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";
import LayoutFooter from "./Footer";
import LayoutSider from "./Sider";
import LayoutFeature from "./Feature";
import styles from "./layouts.m.less";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting"
const DefaultLayout = () => {
useMenuSetting()
return (
    <Layout className={styles["default-layout"]}>
      <LayoutHeader />
      {/* 功能性组件 */}
      <LayoutFeature />
      <Layout>
        {/* 侧栏 */}
        <LayoutSider />
        {/* 内容 */}
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
