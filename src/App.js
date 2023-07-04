import "./App.css"

import GameGrid from "./GameGrid"
import Sidebar from "./Sidebar"

function App() {
    return (
        <>
            <Sidebar />
            <div className="container ps-20 py-4">
                <GameGrid />
            </div>
        </>
    )
}

export default App
