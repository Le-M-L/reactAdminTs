import React, {
  memo,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import { Table } from 'antd';
import {
  BasicTableProps,
  paginationInitialType,
  initialStateType,
  actionType,
} from './tyoings';
import { useCustomRow } from './hooks/useCustomRow';
import { useRowSelection } from './hooks/useRowSelection';
import { useDataSource } from './hooks/useDataSource';
import { usePagination } from './hooks/usePagination';
import { useLoading } from './hooks/useLoading';
// const compare = (pre: ArgTableProps, cur: ArgTableProps) => {
//   let preState = JSON.stringify(pre.columns);
//   let curState = JSON.stringify(cur.columns);
//   if (preState !== curState) return false;
//   return true;
// };

const useAsyncTable: React.FC<BasicTableProps> = (props) => {
  const { api, params, columns, baseProps } = props;
  // 分页数据
  const paginationInitial: paginationInitialType = {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  // table组件全量数据
  const initialState: initialStateType = {
    loading: false,
    pagination: paginationInitial,
    dataSource: [],
  };

  const reducer = (state: initialStateType, action: actionType) => {
    const { payload } = action;
    switch (action.type) {
      case 'TOGGLE_LOADING':
        return { ...state, loading: !state.loading };
      case 'SET_PAGINATION':
        return { ...state, pagination: payload.pagination };
      case 'SET_DATA_SOURCE':
        return { ...state, dataSource: payload.dataSource };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // 改变页码
  function handleTableChange(payload: any) {
    if (payload) {
      const { current } = payload;
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          pagination: {
            ...state.pagination,
            current,
          },
        },
      });
    }
  }

  // useCallback包装请求，缓存依赖，优化组件性能
  const fetchDataWarp = useCallback(fetchData, [
    params,
    state.pagination.current,
    api,
  ]);

  // 引用表格数据
  const [tableData, setTableData] = useState<Recordable[]>([]);

  /** 加载状态配置 */
  const { getLoading, setLoading } = useLoading(props);
  /** 分页配置 */
  const { getPaginationInfo } = usePagination(props, { setLoading });
  /** 行事件 */
  const { onRow } = useCustomRow(props);
  /** 选中操作 */
  const { getRowSelectionRef } = useRowSelection(props, state.dataSource);
  /** 对数据操作 */
  const { getDataSourceRef } = useDataSource(props, {
    setLoading,
    setTableData,
    getPaginationInfo,
  });

  async function fetchData() {
    dispatch({
      type: 'TOGGLE_LOADING',
    });
    const { current, pageSize } = state.pagination;
    let res = await api({ current, pageSize, ...params }).catch((err) => {
      dispatch({ type: 'TOGGLE_LOADING' });
      return {};
    });
    // 关闭loading
    dispatch({
      type: 'TOGGLE_LOADING',
    });
    if (res.success) {
      const { total, data } = res;
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          pagination: { ...state.pagination, total: total },
        },
      });
      // 回填数据
      dispatch({
        type: 'SET_DATA_SOURCE',
        payload: {
          dataSource: data,
        },
      });
    }
  }

  const getTableProps: Recordable = useMemo(
    () => ({
      ...(baseProps || {}),
      onRow: onRow,
      rowSelection: getRowSelectionRef,
    }),
    [getRowSelectionRef],
  );

  useEffect(() => {
    fetchDataWarp();
  }, [fetchDataWarp]);

  return (
    <Table
      columns={columns}
      pagination={state.pagination}
      dataSource={getDataSourceRef}
      loading={getLoading}
      onChange={handleTableChange}
      {...getTableProps}
    />
  );
};

useAsyncTable.defaultProps = {
  autoCreateKey: true,
};

export default memo(useAsyncTable);
