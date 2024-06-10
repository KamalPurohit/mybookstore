import React from "react";

const BookCard = ({ book,handleAddToShelf,idx ,alreadyAdded}) => {
  return (
    <div className=" max-w-[300px] min-w-[300px] bg-primary border-2 border-[#136822] flex-1 h-[200px] flex flex-col gap-5 p-4 rounded-md ">
      <span className="text-gray-300">
        {" "}
        <span className="text-white font-medium">Title:</span> {book.title}
      </span>
      <span className="text-gray-300">
        <span className="text-white font-medium">Edition Count:</span>{" "}
        {book.edition_count}
      </span>
      {alreadyAdded ||<button onClick={()=>handleAddToShelf(idx)} className="bg-[#03300d] text-[#108524] hover:bg-pop hover:text-[#03300d] transtion-all duration-[.2s] w-fit self-center px-4 p-2 roudned-xl font-medium rounded-md  text-sm  flex gap-2 items-center">
        Add to Shelf
      </button>}
    </div>
  );
};

export default BookCard;
