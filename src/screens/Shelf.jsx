import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const Shelf = () => {
  const [shelfBooks, setShelfBooks] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("shelfbooks")) {
      setShelfBooks(JSON.parse(window.localStorage.getItem("shelfbooks")));
    }
  }, []);
  console.log(shelfBooks);
  return (
    <div className="bg-primary text-white flex flex-col p-4">
      <h2 className="text-2xl text-semibold">My bookshelf</h2>
      <div className="flex flex-wrap items-center w-full justify-center gap-10  p-4 rounded-md">
        {
            shelfBooks.length == 0? 
            <span className="text-gray-400">Shelf is Empty!</span>
            
            :
            shelfBooks.map((book, idx) => {
                return (
                  <BookCard
                    book={book}
                    key={idx}
                    idx={idx}
                    handleAddToShelf={(idx) => handleAddToShelf(idx)}
                    alreadyAdded={true}
                  />
                );
              })
        }
        
      </div>
    </div>
  );
};

export default Shelf;
