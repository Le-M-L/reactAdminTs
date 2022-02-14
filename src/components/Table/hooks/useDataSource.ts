import { useState, useEffect, useCallback, useMemo } from 'react';
import { TablePaginationConfig } from 'antd/lib/table';
import type { BasicTableProps, IPaginationType } from '../tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';
import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';
import { isFunction } from '@/utils/is';

interface ActionType {
  setLoading: (loading: boolean) => void;
  setPagintaion: (pagintaion: IPaginationType) => void;
}

export function useDataSource(
  props: BasicTableProps,
  { setLoading, setPagintaion }: ActionType,
) {
  const [dataSource, setDataSource] = useState([]);

  /** 自动创建key */
  const getAutoCreateKey = useMemo(() => {
    return props.autoCreateKey && !props.rowKey;
  }, [props.autoCreateKey, props.rowKey]);

  /** 获取ROWKEY字段 */
  const getRowKey = useMemo(() => {
    return getAutoCreateKey ? ROW_KEY : props.rowKey;
  }, [getAutoCreateKey]);

  /** 请求数据 */
  async function fetch() {
    const { api, fetchSetting } = props;
    if (!api || !isFunction(api)) return;
    try {
      // setLoading(true);
      // 请求结果配置等等
      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting,
      );
      // 请求参数
      let pageParams: Recordable = {};
    } catch (error) {
    } finally {
      // setLoading(false);
    }

    api().then((res) => {
      setDataSource(res.data);
    });
  }

  /** 分页切换的时候触发 */
  function handleTableChange(pagination: TablePaginationConfig) {
    setPagintaion(pagination as IPaginationType);
  }

  /** 缓存请求 */
  const fetchWarp = useCallback(fetch, [props.pagination]);

  useEffect(() => {
    fetchWarp();
  }, [fetchWarp]);

  return {
    dataSource,
    handleTableChange,
  };
}
