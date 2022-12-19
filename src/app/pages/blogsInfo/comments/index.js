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
  useEffect(() => {
    const blogs = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
      setLoader(true);
      if (category) {
        setData(
          doc
            .data()
            .data.filter(
              (el) => el.category.toLowerCase() === category.toLowerCase()
            )
            .reverse()
        );
      } else {
        setData(doc.data().data.reverse());
      }
      setTimeout(() => {
        setLoader(false);
      }, 1200);
    });
    return () => {
      blogs();
    };
  }, [category]);
  return (
    <Dashboard heading={"Blogs/Comments"}>
      <div className="p-4">
        <div className="mb-4">
          <SearchBar setCatagory={setCatagory} />
        </div>
        <List data={data} isLoading={loader} />
      </div>
    </Dashboard>
  );
};

export default Index;
