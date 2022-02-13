import { useState, useEffect, useCallback } from 'react';
import type { BasicTableProps } from '../tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';

export function useDataSource(props: BasicTableProps) {
  const { api } = props;
  const [dataSource, setDataSource] = useState([]);
  /** 请求 */
  async function fetch() {
    api().then((res) => {
      setDataSource(res.data);
    });
  }
  /** 缓存请求 */
  const fetchWarp = useCallback(fetch, []);

  useEffect(() => {
    fetchWarp();
  }, [fetchWarp]);
  return {
    dataSource,
  };
}
