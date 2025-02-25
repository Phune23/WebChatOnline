import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length >= 3) {
      const filteredConversations = conversations.filter((c) =>
        c.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredConversations);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (conversation) => {
    setSelectedConversation(conversation);
    setSearch("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      setSuggestions([]);
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 responsiveSearchInput relative">
        <input
          type="text"
          placeholder="Search.."
          className="input input-bordered rounded-full w-full"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit" className="editButtonSearch btn btn-circle bg-violet-500 text-white">
          <FcSearch className="w-6 h-6 outline-none" />
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-listSearch border-gray-300 rounded-lg mt-2 w-full top-full left-0">
            {suggestions.map((conversation) => (
              <li
                key={conversation.id}
                className="p-2 cursor-pointer hover:bg-violet-500 rounded-lg"
                onClick={() => handleSuggestionClick(conversation)}
              >
                {conversation.fullName}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchInput;