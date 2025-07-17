import { useEffect } from 'react';
import { useStockStore } from './store';

// hook giả lập WebSocket streaming ~2000 msg/s cho đỡ lag
export function useFakeWebSocket() {
  // Lấy hàm updateStocks từ Zustand store (để merge dữ liệu mới)
  const updateStocks = useStockStore(s => s.updateStocks);

  useEffect(() => {
    let buffer = [];       // Buffer tạm để gom dữ liệu WebSocket
    let running = true;    // Flag để dừng khi unmount

    // WebSocket phake message generator
    // Mỗi 10ms ouput ra 20 messages => ~2000 msg/giây
    const genMsgs = () => {
      for (let i = 0; i < 20; i++) {
        buffer.push({
          symbol: `STOCK${Math.floor(Math.random() * 1000)}`, // random mã
          price: (Math.random() * 100).toFixed(2),            // random giá
          volume: Math.floor(Math.random() * 10000)           // random khối lượng
        });
      }
    };
    // Tạo interval gọi genMsgs mỗi 10ms
    const interval = setInterval(genMsgs, 10);

    // flush dữ liệu ra UI theo từng frame (~60fps)
    const flush = () => {
      if (!running) return;         // Nếu component unmount -> stop
      if (buffer.length > 0) {
        updateStocks(buffer);       // Gửi batch dữ liệu mới vào Zustand store
        buffer = [];                // Xóa buffer sau khi flush
      }
      requestAnimationFrame(flush); // Lặp lại flush mỗi frame (~16ms)
    };
    flush(); // Bắt đầu vòng lặp flush

    // 🧹 Cleanup khi component unmount
    return () => {
      running = false;              // Dừng flush
      clearInterval(interval);      // Clear interval fake WebSocket
    };
  }, [updateStocks]);
}
