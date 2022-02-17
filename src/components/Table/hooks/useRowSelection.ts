import { useState, useMemo } from 'react';
import { ROW_KEY } from '../const';
import type { BasicTableProps } from '../tyoings.d';
/** 行选择使用 */
export function useRowSelection(props: BasicTableProps) {
  /** 选中的行key */
  const [selectedRowKeysRef, setSelectedRowKey] = useState<string[]>([]);
  /** 选中的行数据 */
  const [selectedRow, setSelectedRow] = useState<Recordable[]>([]);

  /** 自动创建key */
  const getAutoCreateKey = useMemo(() => {
    return props.autoCreateKey && !props.rowKey;
  }, [props.autoCreateKey, props.rowKey]);

  /** 获取ROWKEY字段 */
  const getRowKey = useMemo(() => {
    return getAutoCreateKey ? ROW_KEY : props.rowKey;
  }, [getAutoCreateKey]);

  /** 设置行key */
  function setSelectedRowKeys(rowKeys: string[]) {
    setSelectedRowKey(rowKeys);
  }

  /** 设置行数据 */
  function setSelectedRows(rows: Recordable[]) {
    setSelectedRow(rows);
  }

  /** 清空选择 */
  function clearSelectedRowKeys() {
    // 清空选中行key
    setSelectedRowKey([]);
    // 清空数据
    setSelectedRow([]);
  }

  /** 根据 key 删除 行 */
  function deleteSelectRowByKey(key: string) {
    setSelectedRowKey(selectedRowKeysRef.filter((item) => item !== key));
  }

  return {
    clearSelectedRowKeys,
    setSelectedRows,
  };
}
