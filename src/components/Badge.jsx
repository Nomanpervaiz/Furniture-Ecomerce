import React from 'react';
import { Avatar, Badge, Space } from 'antd';
const AppBadge = ({count,className}) => (
  <Space size="middle">
    <Badge className={className} count={count} showZero>
      
    </Badge>
   
  </Space>
);
export default AppBadge;