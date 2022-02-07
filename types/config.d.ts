
export interface MenuSetting {
    bgColor: string; // 背景颜色
    fixed: boolean; // 是否固定
    menuWidth: number; //菜单宽度
    // mode:  ; //菜单模式
}


export interface ProjectConfig {
    // 项目主题色
    themeColor: string;

    // 菜单配置
    menuSetting: MenuSetting
}

// 项目环境变量配置
export interface GlobEnvConfig {
    // 网站 tittle
    REACT_APP_TITLE: string;
    // 接口地址 
    REACT_APP_API_URL: string;
    // 接口地址前缀 
    REACT_APP_API_URL_PREFIX?: string;
    // 项目短名
    REACT_APP_SHORT_NAME: string;
    // 文件上传地址
    REACT_APP_UPLOAD_URL?: string;
  }
  