import { memo, useState, type ChangeEventHandler, type FC } from 'react';
import { fetchToggleItem, type Item } from '../../api/Item';
import { useMutation } from '@tanstack/react-query';
import './ItemCard.scss';

type ItemCardProps = {
  item: Item,
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const [checked, setChecked] = useState<boolean>(item.selected);

  const mutation = useMutation({
    mutationKey: ['items', 'selection', item.value],
    mutationFn: ({ value, state }: { value: number, state: boolean }) => fetchToggleItem(value, state),
    onError() {
      setChecked((prev) => !prev);
    }
  });

  const handleSelectionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (mutation.isPending) return;
    const newState = e.target.checked;
    mutation.mutate({ value: item.value, state: newState });
    setChecked(newState);
  }

  return (
    <div className='item-card'>
      <span>{item.value.toLocaleString()}</span>
      {mutation.isError && <span>⚠️</span>}
      <input type='checkbox' onChange={handleSelectionChange} checked={checked} />

    </div>
  )
}

export default memo(ItemCard);