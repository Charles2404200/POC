import { create } from 'zustand';


export const useStockStore = create(set => ({
  stocks: {}, // {symbol: {price, volume}}
  updateStocks: (updates) => set(state => {
    const stocks = { ...state.stocks };
    updates.forEach(u => {
      stocks[u.symbol] = { ...(stocks[u.symbol] || {}), ...u };
    });
    return { stocks };
  })
}));
