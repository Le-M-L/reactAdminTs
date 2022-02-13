import { useState } from 'react';
import type { BasicTableProps, IPaginationType } from '../tyoings.d';
import { useDidUpdateEffect } from '@/hooks/core/useDidUpdateEffect';

export function usePagination(props: BasicTableProps) {
  const [paginationRef, setPagintaionRef] = useState<IPaginationType>({
    current: 1,
    pageSize: 10,
    total: 100,
  });

  function setPagintaion(pagination: IPaginationType) {
    setPagintaionRef(pagination);
  }

  return {
    pagination: paginationRef,
    setPagintaion,
  };
}
