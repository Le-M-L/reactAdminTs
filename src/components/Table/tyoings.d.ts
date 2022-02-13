export interface PaginationInitialType {
  current: number;
  pageSize: number;
  total: number;
}

export interface InitialStateType {
  loading: boolean;
  pagination: PaginationInitialType;
  dataSource: Recordable[];
}

export interface actionType {
  type: string;
  payload?: any;
}
/** 表格 */
export interface BasicTableProps {
  loading?: boolean;
  api: (...arg: any[]) => Promise<any>;
  columns: Recordable[];
}

/** 分页 */
export interface IPaginationType {
  current: number;
  pageSize: number;
  total: number;
}
