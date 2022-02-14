import { useMemo, useState, useEffect } from 'react';
import { isBoolean } from '@/utils/is';
import type { BasicTableProps, IPaginationType } from '../tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';

export function usePagination(props: BasicTableProps) {
  const [configRef, setConfigRef] = useState<IPaginationType>({});
  const pagination = useMemo(() => {
    return {
      current: 1,
      pageSize: 10,
      total: 100,
      ...configRef,
    };
  }, [configRef]);
  console.log('pagination', pagination);
  console.log('props.pagination', props.pagination);
  /** 监听 */
  // useEffect(() => {
  //   setConfigRef({
  //     ...configRef,
  //     ...(isBoolean(props.pagination) ? {} : props.pagination),
  //   });
  // }, [props.pagination]);

  function setPagintaion(pagination: IPaginationType) {
    setConfigRef(pagination);
  }

  return {
    pagination,
    setPagintaion,
  };
}
