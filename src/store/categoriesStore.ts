import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CategoriesStore {
    categories: Array<string>;
    pushCategory: (newCategory: string) => void;
    initializeCategories: (newCategories: Array<string>) => void;
}

const categoriesStore = create<CategoriesStore>()(
    persist(
        (set) => ({
            categories: [],
            pushCategory: (newCategory: string) =>
                set((state) => ({ categories: [...state.categories, newCategory] })),
            initializeCategories: (newCategories: string[]) =>
                set(() => ({ categories: newCategories })),
        }),
        {
            name: 'categories',
        }
    )
);
export default categoriesStore;
