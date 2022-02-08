import type { ProjectConfig } from "#/config";
// 持久缓存 方法
import { Persistent } from "@/utils/cache/persistent";
import { PROJ_CFG_KEY } from "@/enums/cacheEnum";
import { deepMerge } from '@/utils';
import projectSetting from '@/settings/projectSetting';
import { setProjectConfig } from "../store/module/app/actions"
import store from "@/store"
// 最初的项目配置
export function initAppConfigStore() {
  let projCfg: ProjectConfig = Persistent.getLocal(
    PROJ_CFG_KEY
  ) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
 
 store.dispatch(setProjectConfig(projCfg))
}
