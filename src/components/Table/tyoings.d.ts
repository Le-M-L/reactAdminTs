// import { Columns } from '../../types/types'
import { TableProps, ColumnsType } from 'antd/lib/table';

export interface ArgTableProps {
  baseProps?: TableProps<any>;
  api: (...arg: any) => Promise<any>;
  params: any;
  listName?: string;
  columns: ColumnsType<Recordable>;
}
export interface paginationInitialType {
  current: number;
  pageSize: number;
  total: number;
}
export interface initialStateType {
  loading: boolean;
  pagination: paginationInitialType;
  dataSource: Recordable[];
}
export interface actionType {
  type: string;
  payload?: any;
}
