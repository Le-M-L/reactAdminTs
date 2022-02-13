import { useState, useMemo, useEffect } from 'react';
import { buildUUID } from '@/utils/uuid';
import { BasicTableProps, PaginationProps, FetchParams } from '../tyoings';
import { isFunction, isBoolean } from '@/utils/is';
import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';
import { get, cloneDeep, merge, mean } from 'lodash-es';

interface ActionType {
  setLoading: (loading: boolean) => void;
  setTableData: (dataSource: Recordable[]) => void;
  getPaginationInfo: boolean | PaginationProps;
  clearSelectedRowKeys: () => void;
  setPagination: (info: Partial<PaginationProps>) => void;
}

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}

export function useDataSource(
  propsRef: BasicTableProps,
  {
    setLoading,
    setTableData,
    getPaginationInfo,
    clearSelectedRowKeys,
    setPagination,
  }: ActionType,
) {
  const [dataSource, setDataSource] = useState<Recordable[]>();
  // 原始数据
  const [rewDataSourceRef, setRawDataSourceRef] = useState<Recordable[]>();
  /** 查询参数设置 */
  const [searchState, setSearchState] = useState<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });

  /** 是否自动创建key */
  const getAutoCreateKey = useMemo(() => {
    return propsRef.autoCreateKey && !propsRef.rowKey;
  }, []);

  const getRowKey = useMemo(() => {
    return getAutoCreateKey ? ROW_KEY : propsRef.rowKey;
  }, [getAutoCreateKey, propsRef.rowKey]);

  const getDataSourceRef = useMemo(() => {
    if (!dataSource || dataSource.length == 0) {
      return dataSource;
    }
    /** 是否自动生成key */
    if (getAutoCreateKey) {
      const firstItem = dataSource[0];
      const lastItem = dataSource[dataSource.length - 1];
      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
          const data = cloneDeep(dataSource);
          data.forEach((item) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = buildUUID();
            }
            // if (item.children && item.children.length) {
            //   setTableKey(item.children);
            // }
          });
          setDataSource(data);
        }
      }
    }
    console.log(dataSource);
    return dataSource;
  }, [dataSource]);

  /** 请求获取数据 */
  async function fetch(opt?: FetchParams, newPagination?: PaginationProps) {
    const { api, beforeFetch, searchInfo, fetchSetting, pagination, defSort } =
      propsRef;
    if (!api || !isFunction(api)) return;
    try {
      setLoading(true);
      // 请求结果配置等等
      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting,
      );

      // 请求参数
      let pageParams: Recordable = {};
      const { current = 1, pageSize = PAGE_SIZE } =
        getPaginationInfo as PaginationProps;
      if (
        (isBoolean(pagination) && !pagination) ||
        isBoolean(getPaginationInfo)
      ) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.page) || current;
        pageParams[sizeField] = pageSize;
      }
      // 查询参数
      const { sortInfo = {}, filterInfo } = searchState;
      let params: Recordable = merge(
        pageParams,
        searchInfo,
        opt?.searchInfo ?? {},
        defSort,
        sortInfo,
        filterInfo,
        opt?.sortInfo ?? {},
        opt?.filterInfo ?? {},
      );
      // 请求之前处理操作
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params;
      }
      /** 开始请求 */
      const res = await api(params);
      setRawDataSourceRef(res);
      const isArrayResult = Array.isArray(res);
      /** 拿到分页 和 total */
      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? 0 : get(res, totalField);
      setDataSource(resultItems);
      setPagination({
        ...newPagination,
        total: resultTotal || 0,
      });

      // if (opt && opt.page) {
      //   setPagination({
      //     current: opt.page || 1,
      //   });
      // }
      return resultTotal;
    } catch (error) {
      setDataSource([]);
      setPagination({
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  /** 切换分页时候触发 */
  function handleTableChange(pagination: PaginationProps): void {
    const { clearSelectOnPageChange, sortFn } = propsRef;
    // 是否清空选中数据
    if (clearSelectOnPageChange) {
      clearSelectedRowKeys();
    }
    console.log(pagination);
    setPagination({
      ...pagination,
    });
    const params: Recordable = {};
    fetch(params, pagination);
  }

  useEffect(() => {
    fetch();
  }, []);

  /** 引用表格数据 */
  useEffect(() => {}, []);

  return {
    getDataSourceRef,
    handleTableChange,
  };
}
