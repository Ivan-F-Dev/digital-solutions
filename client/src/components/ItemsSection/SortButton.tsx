import { useMutation } from "@tanstack/react-query";
import { type FC, memo } from "react";
import { fetchSortItems } from "../../api/Item";
import { Button } from "..";
import { RootStore } from "../../store";

type SortButtonProps = {
  descending?: boolean;
}

const SortButton: FC<SortButtonProps> = ({ descending = false }) => {
  const mutation = useMutation({
    mutationKey: ['sort'],
    mutationFn: fetchSortItems,
    onSuccess() {
      RootStore.items.setPage(1);
    }
  });

  const handleClick = () => {
    RootStore.items.setItems([...RootStore.items.items].sort((a, b) => descending ? b.value - a.value : a.value - b.value), true)
    // mutation.mutate(descending);
  }

  return (
    <Button onClick={handleClick} disabled={mutation.isPending}>
      {descending ? "DESC" : "ASC"}
    </Button>
  )
}

export default memo(SortButton);