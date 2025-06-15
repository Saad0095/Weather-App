import { FaSearch } from "react-icons/fa"

const Search = () => {
  return (
    <div className="relative">
      <input type="text" className="bg-white w-96 h-10 outline-none rounded-full p-4" placeholder="Search"/>
      <FaSearch className="absolute top-3.5 right-6 text-gray-400"/>
    </div>
  )
}

export default Search
