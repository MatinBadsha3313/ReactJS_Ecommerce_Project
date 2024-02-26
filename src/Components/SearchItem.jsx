import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayProduct from "./DisplayProduct";
import { useFilterStoreProvider } from "../store/Filter_Store";

const SearchItem = () => {
  const { val } = useParams();
  const { filter_Items } = useFilterStoreProvider();

  const [searchValue, setSearchvalue] = useState([]);

  useEffect(() => {
    const filterSearch = () => {
      const value = filter_Items.filter((prod) =>
        prod.title.toLowerCase().includes(val.toLowerCase())
      );

      setSearchvalue(value);
    };

    filterSearch();
  }, [val, filter_Items]);
  return <DisplayProduct items={searchValue} />;
};

export default SearchItem;
