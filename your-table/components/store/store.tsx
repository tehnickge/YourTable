import { create } from 'zustand';

export const useSearchInput = create((set) =>({
    searchInput: 'aboba',
    loading: false,
    error: null,
    setSearchInput: (text : string) => set((state: any) => 
        {
            return {searchInput: text}
        }
    ),
    filterKitchens: [],
    filterCity: "",
    filterStars: 0,

    setFilterKitchens: (data: any) => set((state: any) => {
        return {filterKitchens: [...state.filterKitchens, data]}
    }),
    deleteFilterKitchens: (data: any) => set((state : any) => {
        return {filterKitchens: [...state.filterKitchens.pop(data)]}
    }),

    setFilterCity: (city: string) => set((state: any) => {
        return {filterCity: city}
    }),
    setFilterStars: (number: number) => set((state: any) => {
        return { filterStars: number }
    })
}));