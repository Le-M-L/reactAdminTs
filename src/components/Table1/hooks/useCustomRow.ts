import { ROW_KEY } from '../const';
import { isString, isFunction } from '@/utils/is';
import { BasicTableProps } from '../tyoings';

interface Options {}

/**  */
function getKey(
  record: Recordable,
  rowKey: string | ((record: Record<string, any>) => string) | undefined,
  autoCreateKey?: boolean,
) {
  if (!rowKey || autoCreateKey) {
    return record[ROW_KEY];
  }
  if (isString(rowKey)) {
    return record[rowKey];
  }
  if (isFunction(rowKey)) {
    return record[rowKey(record)];
  }
  return null;
}

/** 设置行属性 使用行 */
export function useCustomRow(propsRef: BasicTableProps) {
  const onRow = (record: Recordable, index?: number) => {
    return {
      /** 行点击 */
      onClick: (event: Event) => {},
      /** 行双击 */
      onDoubleClick: (event: Event) => {},
      onContextMenu: (event: Event) => {
        console.log(3);
      },
      /** 鼠标移入行 */
      onMouseEnter: (event: Event) => {},
      /** 鼠标移出行 */
      onMouseLeave: (event: Event) => {},
    };
  };

  return {
    onRow,
  };
}
