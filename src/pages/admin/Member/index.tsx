import { getMemberList } from '@/services/admin/member';
import BaseTable from '@/components/Table';
import { useState } from 'react';
/** 会员管理 */

const Member = () => {
  // 请求参数
  const [params, setParams] = useState({});
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

  return (
    <>
      <BaseTable api={getMemberList} params={params} columns={columns} />
    </>
  );
};

export default Member;
