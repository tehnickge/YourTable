"use client"

import { useSearchInput } from "../store/StoreSearch";

export default function SearchInput(props:any) {

  const searchInput = useSearchInput((state : any) => state.searchInput);
  const setSearchInput = useSearchInput((state : any) => state.setSearchInput);
  const filterStars = useSearchInput((state : any) => state.filterStars);
  const setFilterStars = useSearchInput((state : any) => state.setFilterStars);
  const filterKitchens = useSearchInput((state : any) => state.filterKitchens);
  const addFilterKitchens = useSearchInput((state : any) => state.addFilterKitchens);
  const deleteFilterKitchens = useSearchInput((state : any) => state.deleteFilterKitchens);
  

  const SearchChangeHandler = (event: any) =>{
    setSearchInput(event.target.value)
  };

  const ButtonChangeHandler = () => {
    setFilterStars(filterStars + 1);
    console.log(filterStars)
  };

  const CheckBoxChangeHandler = (event: any) => {
    console.log(event.target.checked)
    if(event.target.checked) {
      addFilterKitchens(event.target.value)
    }
    if(!(event.target.checked)) {
      deleteFilterKitchens(event.target.value)
    }
    
  }
  console.log(filterKitchens);
  console.log(searchInput);
  console.log(filterStars);
  return (
    <div className="search-input bg-gray-700 text-white">
      <input className="search-input__input mx-10 my-4 w-11/12" 
      type="text" 
      onChange={SearchChangeHandler}></input>
      <button onClick={ButtonChangeHandler}>a1</button>
      <div>
        FILTER KITCHEN
        <li>
          <label htmlFor="filter1"><input type="checkbox" id="filter1" onChange={CheckBoxChangeHandler} value={"Русская кухня"} />Русская кухня</label>
          <label htmlFor="filter2"><input type="checkbox" id="filter2" onChange={CheckBoxChangeHandler} value={"Фрацузкая кухня"} />Фрацузкая кухня</label>
        </li>
      </div>
    </div>
  );
}

