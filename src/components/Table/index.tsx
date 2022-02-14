import React, {
  useEffect,
  useReducer,
  useCallback,
  useState,
  memo,
  useMemo,
} from 'react';
import { Table } from 'antd';
import { useLoading } from './hooks/useLoading';
import type { BasicTableProps } from './tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';
import { usePagination } from './hooks/usePagination';
import { useDataSource } from './hooks/useDataSource';

const compare = (pre: BasicTableProps, cur: BasicTableProps) => {
  let preState = JSON.stringify(pre);
  let curState = JSON.stringify(cur);
  console.log(pre, cur, pre === cur);
  if (preState !== curState) return false;
  return true;
};

const BasicTable: React.FC<BasicTableProps> = (props) => {
  console.log(11);

  /** 加载动画设置 */
  const { loading, setLoading } = useLoading(props);
  /** 分页设置 */
  const { pagination, setPagintaion } = usePagination(props);
  const getProps = useMemo(() => {
    return {
      ...props,
      pagination: pagination,
    };
  }, [props, pagination]);
  /** 数据获取 */
  const { dataSource, handleTableChange } = useDataSource(getProps, {
    setLoading,
    setPagintaion,
  });

  return (
    <>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={props.columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

BasicTable.defaultProps = {
  loading: false,
  autoCreateKey: true,
};

export default memo(BasicTable);
