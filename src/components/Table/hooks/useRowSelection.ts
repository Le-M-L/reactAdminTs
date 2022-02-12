import { useState, useMemo, useEffect } from 'react';
import { isFunction } from '@/utils/is';
// import { omit } from 'lodash-es';
import { BasicTableProps } from '../tyoings';
import { findNodeAll } from '@/utils/helper/treeHelper';
import { ROW_KEY } from '../const';

/** 行选择 */
export function useRowSelection(
  props: BasicTableProps,
  dataSource: Recordable[],
) {
  /** 选中行的key */
  const [selectedRowKeysRef, setSelectedRowKeysRef] = useState<string[]>([]);
  /** 选中行的数据 */
  const [selectedRowRef, setSelectedRowRef] = useState<Recordable[]>([]);
  /** 多选单选配置 */
  const getRowSelectionRef = useMemo(() => {
    // const { rowSelection } = props;
    return {
      selectedRowKeys: selectedRowKeysRef,
      onChange: (selectedRowKeys: string[]) => {
        setSelectedRowKeys(selectedRowKeys);
      },
      //   ...omit(rowSelection, ['onChange']),
    };
  }, [props.rowSelection, selectedRowKeysRef]);

  useEffect(() => {
    if (props.rowSelection?.selectedRowKeys) {
      setSelectedRowKeys(props.rowSelection?.selectedRowKeys as string[]);
    }
  }, [props.rowSelection?.selectedRowKeys]);

  useEffect(() => {
    const { rowSelection } = props;
    if (rowSelection) {
      const { onChange } = rowSelection;
      if (onChange && isFunction(onChange))
        onChange(getSelectRowKeys(), getSelectRows());
    }
  }, [selectedRowKeysRef]);

  const getAutoCreateKey = useMemo(() => {
    return props.autoCreateKey && !props.rowKey;
  }, []);

  const getRowKey = useMemo(() => {
    return getAutoCreateKey ? ROW_KEY : props.rowKey;
  }, [getAutoCreateKey, props.rowKey]);

  /** 设置选中的行key */
  function setSelectedRowKeys(rowKeys: string[]) {
    setSelectedRowKeysRef(rowKeys);
    // 选中的数据
    const allSelectedRows = findNodeAll(
      dataSource.concat(selectedRowRef),
      (item) => rowKeys.includes(item[getRowKey as string]),
      {
        children: props.childrenColumnName ?? 'children',
      },
    );
    const trueSelectedRows: any[] = [];
    rowKeys.forEach((key: string) => {
      const found = allSelectedRows.find(
        (item) => item[getRowKey as string] === key,
      );
      found && trueSelectedRows.push(found);
    });
    setSelectedRows(trueSelectedRows);
  }

  /** 设置选中行数据 */
  function setSelectedRows(rows: Recordable[]) {
    setSelectedRowRef(rows);
  }

  /** 清空选中行 */
  function clearSelectedRowKeys() {
    setSelectedRowKeysRef([]);
    setSelectedRowRef([]);
  }

  /** 删除选中行数据 根据 key */
  function deleteSelectRowByKey(key: string) {
    const index = selectedRowKeysRef.findIndex((item) => item === key);
    if (index !== -1) {
      setSelectedRowKeysRef(selectedRowKeysRef.splice(index, 1));
    }
  }

  /** 获取选中行的key */
  function getSelectRowKeys() {
    return selectedRowKeysRef;
  }

  /** 获取选中行数据 */
  function getSelectRows<T = Recordable>() {
    return selectedRowRef as T[];
  }

  /** 会外扩展实例 */
  function getRowSelection() {
    return getRowSelectionRef;
  }
  return {
    getRowSelection,
    getRowSelectionRef,
    getSelectRows,
    getSelectRowKeys,
    setSelectedRowKeys,
    clearSelectedRowKeys,
    deleteSelectRowByKey,
    setSelectedRows,
  };
}
