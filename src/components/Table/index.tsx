import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { PaginationInitialType } from './tyoings.d';
const BasicTable: React.FC = () => {
  /** 分页数据 */
  const paginationInitial: PaginationInitialType = {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  return <Table />;
};

export default BasicTable;
