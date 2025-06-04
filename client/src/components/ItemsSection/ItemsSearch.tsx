import { memo, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import { RootStore } from "../../store";
import './ItemsSearch.scss';

const ItemsSearch = () => {
    const debouncedInputHandler = useMemo(() => {
        return debounce((value: string) => {
            RootStore.items.setFilterSearch(value);
            RootStore.items.setPage(1);
        }, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedInputHandler.cancel(); // очистка таймера при размонтировании
        };
    }, [debouncedInputHandler]);

    return (
        <input
            className="items-search"
            type="search"
            placeholder="Search with debounce..."
            onInput={(e) => {
                debouncedInputHandler(e.currentTarget.value); // только value, без передачи события
            }}
        />
    );
};

export default memo(ItemsSearch);
