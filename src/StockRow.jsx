import React from 'react';

// Mỗi row chỉ render lại khi props thay đổi (memoized)
export const StockRow = React.memo(({ symbol, data }) => (
  <div
    style={{
      display: 'flex',
      padding: '4px 8px',
      borderBottom: '1px solid #ddd',
      fontFamily: 'monospace',
    }}
  >
    <div style={{ width: 100 }}>{symbol}</div>
    <div style={{ width: 80, textAlign: 'right' }}>{data?.price}</div>
    <div style={{ width: 80, textAlign: 'right' }}>{data?.volume}</div>
  </div>
));
