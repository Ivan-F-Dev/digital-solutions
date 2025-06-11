import { makeAutoObservable } from "mobx";
import type { Item } from "../api/Item";

export class ItemsStore {
  items: Item[] = [];
  page: number = 1;
  isPageLoaded: boolean = false;
  filterSearch: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setItems(items: Item[] | undefined, sort = false) {
    this.isPageLoaded = !!items;
    items ??= [];
    if (sort) return  this.items = items;
    if (this.page > 1) this.items.push(...items)
    else this.items = items;
  }

  setFilterSearch(search: string) {
    this.filterSearch = search.toLowerCase();
  }

  setPage(page: number) {
    this.page = page;
    this.isPageLoaded = false;
    if (page === 1) this.setItems(undefined);
  }
}