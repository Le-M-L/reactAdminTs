import { useState, useMemo } from 'react';
import { Button } from 'antd';
import { getMemberList } from '@/services/admin/member';
import BaseTable from '@/components/Table';
/** 会员管理 */
const Member = () => {
  // 请求参数
  const [params, setParams] = useState({});
  const [count, setCount] = useState(0);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => {
        return <a href="">edit</a>;
      },
    },
  ];
  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <span>{count}</span>
      <Button onClick={handleCount}>点击</Button>
      <BaseTable api={getMemberList} params={params} columns={columns} />
    </>
  );
};

export default Member;
