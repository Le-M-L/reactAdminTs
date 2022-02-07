import type { ProjectConfig } from "#/config";
import { SIDE_BAR_BG_COLOR_LIST } from "./designSetting";
// 项目配置  初始配置
const setting: ProjectConfig = {
  // 项目主题色
  themeColor: "#0960bd",
  menuSetting: {
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    fixed: true,
    menuWidth: 210,
  },
};

export default setting;
