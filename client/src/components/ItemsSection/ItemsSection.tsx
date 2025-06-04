import './ItemsSection.scss';
import { Container } from '..';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../../store';
import { useCallbackOnScroll } from '../../hooks';
import { useCallback, useEffect, useState } from 'react';
import ItemCardList from './ItemCardList';
import ItemsSearch from './ItemsSearch';
import SortButton from './SortButton';
import { fetchItems } from '../../api/Item';

const ItemsSection = observer(() => {
  const { page, filterSearch, isPageLoaded } = RootStore.items;
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (isPageLoaded) return;
    setIsFetching(true);
    setIsError(false);
    fetchItems(filterSearch, page)
      .then((items) => RootStore.items.setItems(items))
      .catch(() => setIsError(true))
      .finally(() => setIsFetching(false))
  }, [page, filterSearch, isPageLoaded]);

  const handleScrollToBottomPage = useCallback(() => {
    if (!isPageLoaded) return;
    RootStore.items.setPage(page + 1);
  }, [isPageLoaded, page]);
  useCallbackOnScroll(80, handleScrollToBottomPage);

  return (
    <section className="items-section">
      <Container>
        <div className="items-section__wrapper">
          <div className="items-section__filters">
            <div className="items-section__filter-buttons">
              <SortButton />
              <SortButton descending />
            </div>
            <ItemsSearch />
          </div>
          <ItemCardList />
          {isFetching && <span>Загрузка...</span>}
          {isError && <span>При загрузке данных произошла ошибка&nbsp;🙄</span>}
        </div>
      </Container>
    </section>
  )
})

export default ItemsSection;