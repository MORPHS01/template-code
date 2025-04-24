'use client';

import { useState } from 'react';
import DropdownMenu from "@/components/dropdownmenu"; // Adjust the import path

const products = [
  { id: 1, name: 'Item A', price: 50, color: 'red' },
  { id: 2, name: 'Item B', price: 100, color: 'blue' },
  { id: 3, name: 'Item C', price: 200, color: 'yellow' },
  { id: 4, name: 'Item D', price: 150, color: 'pink' },
];

const priceOptions = [50, 100, 150, 200];
const colors = ["red", "blue", "green", "yellow", "purple", "pink"];

export default function FilteredProductList() {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const filtered = selectedPrice && selectedColor ? products.filter((p) => p?.price <= selectedPrice) && products.filter((p) => p?.color === selectedColor) : products;

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <DropdownMenu
        options={priceOptions}
        selected={selectedPrice}
        onSelect={setSelectedPrice}
        formatOption={(val) => `Under $${val}`}
        placeholder="Filter by max price"
      />

      <DropdownMenu
        options={colors}
        selected={selectedColor}
        onSelect={setSelectedColor}
        placeholder="Filter by color"
        className="w-full"
      />
      
      <div className="space-y-3">
        {filtered.map((product) => (
          <div
            key={product?.id}
            className="border rounded-xl px-4 py-3 flex justify-between shadow-sm"
          >
            <span>{product?.name}</span>
            <span className="text-gray-700 font-medium">${product?.price}</span>
            <span className="text-gray-700 font-medium">{product?.color}</span>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-gray-500">
            No products found under that price.
          </div>
        )}
      </div>
    </div>
  );
}
