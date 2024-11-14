import { create } from 'zustand';

interface CategoriesStore {
    categories: Array<string>;
    pushCategory: (newCategory: string) => void;
    initializeCategories: (newCategories: Array<string>) => void;
}

const categoriesStore = create<CategoriesStore>((set) => ({
    categories: [],
    pushCategory: (newCategory: string) =>
        set((state) => ({ categories: [...state.categories, newCategory] })),
    initializeCategories: (newCategories: Array<string>) =>
        set(() => ({ categories: newCategories })),
}));

export default categoriesStore;
