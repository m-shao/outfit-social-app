import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {
    const [selectedNav, setSelectedNav] = useState('feed')
    
    return (
        <div className="App">
            <Navbar
            selectedNav={selectedNav}
            setSelectedNav={setSelectedNav}/>
        </div>
    )
}

export default App
