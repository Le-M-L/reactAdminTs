import type { GlobEnvConfig } from "#/config";
import pkg from "../../package.json";
import { warn } from "@/utils/log";

export function getCommonStoragePrefix() {
  const { REACT_APP_SHORT_NAME } = getAppEnvConfig();
  return `${REACT_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// 根据版本生成缓存密钥
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

// 获取文件名
export function getConfigFileName(env: Record<string, any>) {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || "__APP"}__CONF__`
    .toUpperCase()
    .replace(/\s/g, "");
}

// 当前环境变量
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(process.env);
  const ENV = (process.env
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
      (process.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const {
    REACT_APP_TITLE,
    REACT_APP_API_URL,
    REACT_APP_SHORT_NAME,
    REACT_APP_API_URL_PREFIX,
    REACT_APP_UPLOAD_URL,
  } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(REACT_APP_SHORT_NAME)) {
    warn(
      `REACT_APP_SHORT_NAME变量只能为字符/下划线，请在环境变量中修改后重新运行。`
    );
  }

  return {
    REACT_APP_TITLE,
    REACT_APP_API_URL,
    REACT_APP_SHORT_NAME,
    REACT_APP_API_URL_PREFIX,
    REACT_APP_UPLOAD_URL,
  };
}

/**
 * @description: 开发模式
 */
export const devMode = "development";

/**
 * @description: 生产模式
 */
export const prodMode = "production";

/**
 * @description: 获取环境变量
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return process.env.NODE_ENV as string;
}

/**
 * @description: 是否为开发环境
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return process.env.NODE_ENV === devMode;
}
/**
 * @description: 是否为生产模式
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return process.env.NODE_ENV === prodMode;
}
