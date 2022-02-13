import { useEffect, useMemo, useState } from 'react';
import type { BasicTableProps } from '../tyoings.d';

export function useLoading(props: BasicTableProps) {
  const [loading, setLoading] = useState(props.loading);

  const getLoading = useMemo(() => loading, [loading]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  return { getLoading, setLoading };
}
