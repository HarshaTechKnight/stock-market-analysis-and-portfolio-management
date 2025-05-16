"use client";

import { useState, useEffect, useCallback } from 'react';
import type { PortfolioStock } from '@/types';

const PORTFOLIO_STORAGE_KEY = 'marketSagePortfolio';

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPortfolio = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (storedPortfolio) {
        setPortfolio(JSON.parse(storedPortfolio));
      }
    } catch (error) {
      console.error("Failed to load portfolio from localStorage:", error);
      // Optionally clear corrupted data
      // localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) { // Only save to localStorage after initial load
      try {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
      } catch (error) {
        console.error("Failed to save portfolio to localStorage:", error);
      }
    }
  }, [portfolio, isLoaded]);

  const addStock = useCallback((stock: Omit<PortfolioStock, 'id' | 'purchaseDate'> & { purchaseDate?: string }) => {
    const newStock: PortfolioStock = {
      ...stock,
      id: `${stock.symbol}-${Date.now()}`, // Simple unique ID
      purchaseDate: stock.purchaseDate || new Date().toISOString(),
    };
    setPortfolio((prevPortfolio) => {
      // Prevent adding duplicate symbols for simplicity, or allow and handle aggregation later
      if (prevPortfolio.some(s => s.symbol === newStock.symbol)) {
        // For now, let's replace if symbol exists, or you can throw an error/show a message
        // This example replaces, a real app might merge or warn.
        // return prevPortfolio.map(s => s.symbol === newStock.symbol ? newStock : s);
        // Or just add, allowing multiple entries for same stock (e.g. bought at different times)
         return [...prevPortfolio, newStock];
      }
      return [...prevPortfolio, newStock];
    });
  }, []);

  const removeStock = useCallback((stockId: string) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.filter((stock) => stock.id !== stockId)
    );
  }, []);
  
  const updateStock = useCallback((updatedStock: PortfolioStock) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.map((stock) =>
        stock.id === updatedStock.id ? updatedStock : stock
      )
    );
  }, []);


  return { portfolio, addStock, removeStock, updateStock, isLoaded };
}
