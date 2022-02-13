import { useMemo, useState } from 'react';
import { isBoolean } from '@/utils/is';
import { BasicTableProps, PaginationProps } from '../tyoings';
import { useEffect } from 'react';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const';

// function itemRender<ItemRender>(
//   page: number,
//   type: 'page' | 'prev' | 'next',
//   originalElement: React.ReactNode,
// ) {
//   if (type === 'prev') {
//     return page === 0 ? null : <LeftOutlined />;
//   } else if (type === 'next') {
//     return page === 1 ? null : <RightOutlined />;
//   }
//   return originalElement;
// }

/** 使用分页 */
export function usePagination(props: BasicTableProps, {}) {
  // 分页配置
  const [configRef, setConfigRef] = useState<PaginationProps>({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);

  /** 获取分页配置 */
  const getPaginationInfo = useMemo<PaginationProps | false>(() => {
    if (!show || (isBoolean(props.pagination) && !props.pagination)) {
      return false;
    }
    return {
      size: 'small',
      current: 1,
      pageSize: PAGE_SIZE,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showTotal: (total) => `共 ${total} 条数据`,
      //   itemRender: itemRender,
      ...(isBoolean(props.pagination) ? {} : props.pagination),
      ...configRef,
    };
  }, [configRef, props.pagination, show]);
  /** 获取分页配置 */
  function getPagination() {
    return getPaginationInfo;
  }

  /** 设置分页 */
  function setPagination(info: any) {
    setConfigRef({
      ...(!isBoolean(getPaginationInfo) ? getPaginationInfo : {}),
      ...info,
    });
  }

  /** 是否显示分页 */
  function getShowPagination() {
    return show;
  }

  /** 设置分页显示 */
  function setShowPagination(flag: boolean) {
    setShow(flag);
  }

  /** 监听分页配置变化 更新分页配置 */
  useEffect(() => {
    if (!isBoolean(props.pagination) && props.pagination) {
      setConfigRef({
        ...configRef,
        ...props.pagination,
      });
    }
  }, [props.pagination]);

  return {
    getPagination,
    getPaginationInfo,
    setShowPagination,
    getShowPagination,
    setPagination,
  };
}
