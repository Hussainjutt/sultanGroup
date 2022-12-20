import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import Dashboard from "../../../adminDashboard";
import SearchBar from "./components/searchBar";
import List from "./components/List";
const Index = () => {
  const [data, setData] = useState([]);
  const [category, setCatagory] = useState("");
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "products", "allProducts"), (doc) => {
      setLoader(true);
      if (category || search) {
        let dummy = doc.data().data;
        if (category) {
          dummy = dummy.filter(
            (el) => el?.category?.toLowerCase() === category
          );
        }
        if (search) {
          let arr = [];
          for (let i = 0; i < dummy.length; i++) {
            if (dummy[i].title.toLowerCase().includes(search.toLowerCase())) {
              arr.push(dummy[i]);
            }
          }
          dummy = arr;
        }
        setData(dummy.reverse());
      } else {
        setData(doc?.data().data.reverse());
      }
      setTimeout(() => {
        setLoader(false);
      }, 1400);
    });
    return () => {
      unSub();
    };
  }, [category, search]);
  return (
    <Dashboard heading={"Products/Quotes"}>
      <div className="p-4">
        <div className="mb-4">
          <SearchBar setCatagory={setCatagory} setSearch={setSearch} />
        </div>
        <List data={data} isLoading={loader} />
      </div>
    </Dashboard>
  );
};

export default Index;
