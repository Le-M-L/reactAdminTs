import React, {
  useEffect,
  useReducer,
  useCallback,
  useState,
  memo,
} from 'react';
import { Table } from 'antd';
import { useLoading } from './hooks/useLoading';
import type { BasicTableProps } from './tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';
import { usePagination } from './hooks/usePagination';
import { useDataSource } from './hooks/useDataSource';

const BasicTable: React.FC<BasicTableProps> = (props) => {
  console.log(11);
  /** 加载动画设置 */
  const { loading } = useLoading(props);
  /** 分页设置 */
  const { pagination } = usePagination(props);
  /** 数据获取 */
  const { dataSource } = useDataSource(props);

  return (
    <Table
      loading={loading}
      dataSource={dataSource}
      columns={props.columns}
      pagination={pagination}
    />
  );
};

BasicTable.defaultProps = {
  loading: false,
};

export default memo(BasicTable);
