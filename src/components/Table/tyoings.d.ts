// import { Columns } from '../../types/types'
import { TableProps, ColumnsType, ColumnProps } from 'antd/lib/table';
import {
  TableRowSelection as ITableRowSelection,
  TablePaginationConfig,
} from 'antd/lib/table/interface';

// export interface TableRowSelection<T = any> extends ITableRowSelection<T> {
//   onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any
// }
// 分页接口
interface PaginationProps extends TablePaginationConfig {
  total?: number; // 总数
  defaultCurrent?: number; // 默认的当前页
  current?: number; // 当前页
  defaultPageSize?: number; // 默认的分页大小
  pageSize?: number; // 分页大小
  // size?: string; // 分页大小 默认 small
  simple?: boolean; //简单分页
  pageSizeOptions?: string[]; // 指定每页显示多少条
  showSizeChanger?: boolean; // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
  showTotal?: (total: number, range: [number, number]) => any; //用于显示数据总量和当前数据顺序
  // 用于自定义页码的结构
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: React.ReactNode,
  ) => React.ReactNode;
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段  支持 a.b.c
  listField: string;
  // 请求结果总数字段  支持 a.b.c
  totalField: string;
}
export declare type SortOrder = 'ascend' | 'descend';

export interface SorterResult {
  column: ColumnProps<Recordable>;
  order: SortOrder;
  field: string;
  columnKey: string;
}

export interface BasicTableProps<T = any> {
  baseProps?: TableProps<any>;
  api: (...arg: any) => Promise<any>;
  params: any;
  listName?: string;
  columns: ColumnsType<Recordable>;
  rowSelection?: ITableRowSelection<Recordable>;
  onRow?: (record: T, index?: number) => object;
  autoCreateKey?: boolean; // 自动生成KEY
  rowKey?: string | ((record: Recordable) => string); // 行key
  childrenColumnName?: string;
  pagination?: PaginationProps;
  loading?: boolean;
  fetchSetting?: FetchSetting; //
  // 默认的排序参数
  defSort?: Recordable;
  // 额外的请求参数
  searchInfo?: Recordable;
  // 请求之前处理参数
  beforeFetch?: Fn;
  // 自定义排序方法
  sortFn?: (sortInfo: SorterResult) => any;
  clearSelectOnPageChange?: boolean; // 在分页改变时 清空选中值
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

/** 请求参数 */
export interface FetchParams {
  searchInfo?: Recordable;
  page?: number;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}
