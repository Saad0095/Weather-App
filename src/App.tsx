import { useState } from "react"
import MainSection from "./components/MainSection"
import Search from "./components/Search"

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-500 min-h-screen flex items-center flex-col py-20">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainSection searchTerm={searchTerm}/>
    </div>
  )
}

export default App
