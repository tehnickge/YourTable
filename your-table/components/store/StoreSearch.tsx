import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useSearchInput = create(
  immer(
    (set, get) => ({
    searchInput: "",
    restaurants: [],
    filterKitchens: [],
    filterCity: "",
    filterStars: 0,
    loading: false,
    error: null,

    setSearchInput: (text: string) =>
      set((state: any) => {
        return { searchInput: text };
      }),
    addFilterKitchens: (data: any) =>
      set((state: any) => {
        state.filterKitchens.push(data);
      }),
    deleteFilterKitchens: (data: any) =>
      set((state: any) => {
        state.filterKitchens.pop(data);
      }),
    setFilterCity: (city: string) =>
      set((state: any) => {
        state.filterCity = city;
      }),
    setFilterStars: (number: number) => set((state: any) => {}),

    fetchRestaurants: async () => {
      // @ts-ignore
      const filterKitchens = get().filterKitchens;
      // @ts-ignore
      const rest = get().restaurants;
      const res = await fetch("http://localhost:3000/api/restaurants");
      const [restData, resInfo] = await res.json();
      const filterByKitchen = (item: any) => {
        return (
          filterKitchens.length === 0 ||
          filterKitchens.filter((kitchen: any) =>
            item.typeKitchen.includes(kitchen)
          ).length !== 0
        );
      };
      set({ restaurants: { restData: restData.filter(filterByKitchen) } });
    },
  }))
);
