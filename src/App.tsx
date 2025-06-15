import MainSection from "./components/MainSection"
import Search from "./components/Search"

function App() {

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-500 min-h-screen flex justify-center items-center flex-col">
      <Search/>
      <MainSection/>
    </div>
  )
}

export default App
