import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { useStockStore } from './store';
import { StockRow } from './StockRow';

// Virtualized bảng giá
export default function PriceBoard() {
  // Lấy toàn bộ stocks từ Zustand store
  const stocks = useStockStore(state => state.stocks);

  // Lấy danh sách keys
  const symbols = Object.keys(stocks);

  return (
    <List
      height={600}            //  (viewport)
      itemCount={symbols.length} // Tổng số rows
      itemSize={32}           // Chiều cao mỗi row (px)
      width={320}
    >
      {({ index, style }) => {
        const symbol = symbols[index];     // Mã tại vị trí index
        const data = stocks[symbol];       // Dữ liệu giá/volume
        return (
          <div style={style}>
            <StockRow symbol={symbol} data={data} />
          </div>
        );
      }}
    </List>
  );
}
