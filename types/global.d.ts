declare module "*.less" {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
  // declare module '*.less'
}

declare type Nullable<T> = T | null;

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
