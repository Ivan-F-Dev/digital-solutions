import { ItemsStore } from "./ItemsStore";

class RootStore {
  items: ItemsStore = new ItemsStore();
}

export default new RootStore();