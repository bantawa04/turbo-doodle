import React, { useState } from "react";
import { Space, Typography, Radio } from "antd";
export const FilterByStatus = ({
  onDataFilter,
  todosCount,
  activeCount,
  completedCount,
}: {
  onDataFilter: (val: string) => void;
  todosCount: number,
  activeCount: number,
  completedCount: number,
}) => {
  const [status, setStatus] = useState("all");
  return (
    <Space direction="vertical" size="small">
      <Typography.Text strong>Filter By:</Typography.Text>
      <Radio.Group
        value={status}
        onChange={(e: any) => {
          setStatus(e?.target?.value);
          onDataFilter(e?.target?.value);
        }}
      >
        <Space direction="vertical" size="large">
          <Radio value="all">All ({todosCount})</Radio>
          <Radio value="active">Active ({activeCount})</Radio>
          <Radio value="completed">Completed ({completedCount})</Radio>
        </Space>
      </Radio.Group>
    </Space>
  );
};
