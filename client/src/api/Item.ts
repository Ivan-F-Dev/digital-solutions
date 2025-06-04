import { z } from 'zod';
import { api } from './api';

export const ItemSchema = z.object({
  value: z.number(),
  selected: z.boolean(),
});

export const ItemsArraySchema = z.array(ItemSchema);

export type Item = z.infer<typeof ItemSchema>;

export const fetchItems = async (search: string = '', page: number = 1): Promise<Item[]> => {
  const response = await api.get('/items', {
    params: { search, page }
  });
  return ItemsArraySchema.parse(response.data);
}

export const fetchSelectItem = async (value: number): Promise<Item> => {
  const response = await api.post(`/items/${value}/select`);
  return ItemSchema.parse(response.data);
}

export const fetchDeselectItem = async (value: number): Promise<Item> => {
  const response = await api.patch(`/items/${value}/deselect`);
  return ItemSchema.parse(response.data);
}

export const fetchToggleItem = async (value: number, state: boolean): Promise<Item> => {
  return state ? fetchSelectItem(value) : fetchDeselectItem(value);
}

export const fetchSortItems = async (descending: boolean): Promise<void> => {
  await api.post('/items/sort', { descending });
}

export const fetchMoveItem = async (value: number, placeAfter: number): Promise<void> => {
  await api.post('/items/move', { value, placeAfter });
}