import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import BookCard from "../components/BookCard";

const Home = () => {
  //serch qurey state
  const [serch, setSerch] = useState("");
  // serch result state
  const [serchResult, setSerchResult] = useState([]);
  // result loading state
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyAddedIds, setAlreadyAddedIds] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("shelfbooks")) {
      setAlreadyAddedIds((prev) => {
        const books = JSON.parse(window.localStorage.getItem("shelfbooks"));
        const ids = books.map((book) => book.cover_i);
        return ids;
      });
    }
  }, []);

  console.log(alreadyAddedIds);
  const getBooksBySerch = async (serchQurey) => {
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${serchQurey}&limit=10&page=1`
      );
      console.log(res);
      setSerchResult(res.data.docs);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  //debounce the request if the serch qurey is less than 3 char or a 500ms delay
  const debounceApiCall = _.debounce((searchQuery) => {
    if (searchQuery.length >= 3) {
      setIsLoading(true);
      getBooksBySerch(searchQuery);
    }
  }, 500);

  useEffect(() => {
    debounceApiCall(serch);
    return () => {
      debounceApiCall.cancel();
    };
  }, [serch]);

  const handleAddToShelf = (idx) => {
    let bookList = [];
    if (window.localStorage.getItem("shelfbooks")) {
      bookList = JSON.parse(window.localStorage.getItem("shelfbooks"));
    }
    console.log(bookList);
    bookList.push(serchResult[idx]);
    setAlreadyAddedIds(prev=>[...prev,serchResult[idx].cover_i])
    window.localStorage.setItem("shelfbooks", JSON.stringify(bookList));
  };

  return (
    <div className="bg-primary text-white flex flex-col p-4">
      <div className="bg-secondary self-center rounded-md p-2 px-4 flex gap-2 items-center  ">
        <input
          type="text"
          value={serch}
          onChange={(e) => setSerch(e.target.value)}
          className="bg-secondary outline-none"
          placeholder="Serch books by name"
        />
        <HiMiniMagnifyingGlass className="w-4 h-4 text-gray-200" />
      </div>
      <div className="py-4 p-2 w-full items-center">
        {isLoading ? (
          <span className="text-gray-400 w-full text-center">Loading...</span>
        ) : (
          <div className="flex gap-2 flex-col">
            <h4 className="text-2xl font-medium">Results</h4>
            {serch.length < 3 ? (
              <span className="text-gray-400">
                Enter more than 3 or more character to serch.
              </span>
            ) : serchResult.length == 0 ? (
              <span className="text-gray-400">No Books Found :/</span>
            ) : (
              <div className="flex flex-wrap items-center w-full justify-center gap-10  p-4 rounded-md">
                {serchResult.map((book, idx) => {
                  return (
                    <BookCard
                      book={book}
                      key={idx}
                      idx={idx}
                      handleAddToShelf={(idx) => handleAddToShelf(idx)}
                      alreadyAdded={alreadyAddedIds.includes(book.cover_i)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
