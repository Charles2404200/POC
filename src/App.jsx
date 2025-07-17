import React from 'react';
import PriceBoard from './PriceBoard';
import { useFakeWebSocket } from './useFakeWebSocket';

export default function App() {
  useFakeWebSocket();

  return (
    <div style={{ padding: 20 }}>
      <h2>🚀 Vietcap POC (~2000 msg/s)</h2>
      <PriceBoard />
    </div>
  );
}
