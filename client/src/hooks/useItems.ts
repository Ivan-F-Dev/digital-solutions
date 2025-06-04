import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { type Item, fetchMoveItem } from "../api/Item";
import { RootStore } from "../store";

export const useItems = () => {
  const [movedItem, setMovedItem] = useState<Item | null>(null);
  const [movedAfterItem, setMovedAfterItem] = useState<Item | null>(null);
  const [lastDragIndex, setLastDragIndex] = useState<number | null>(null);
  const items = RootStore.items.items;

  const mutation = useMutation({
    mutationKey: ['items', 'drag'],
    mutationFn: ({ value, placeAfter }: { value: number, placeAfter: number }) => fetchMoveItem(value, placeAfter),
  });

  const handleDragStart = (index: number) => {
    setMovedItem(items[index]);
    setLastDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (!movedItem || lastDragIndex === null || lastDragIndex === index) return;

    const updatedItems = [...items];
    updatedItems.splice(lastDragIndex, 1);
    updatedItems.splice(index, 0, movedItem);

    RootStore.items.setItems(updatedItems);
    setMovedAfterItem(updatedItems[lastDragIndex]);
    setLastDragIndex(index);
  };

  const handleDrop = () => {
    if (!movedItem || !movedAfterItem || movedItem === movedAfterItem) return;

    mutation.mutate({ value: movedItem.value, placeAfter: movedAfterItem.value });
    setLastDragIndex(null);
    setMovedItem(null);
    setMovedAfterItem(null);
  }

  return { items, handleDragStart, handleDragOver, handleDrop }
}