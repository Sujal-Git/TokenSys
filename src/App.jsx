import './App.css'
import { Link,Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
function App() {
    return(
        <>
          <Routes>
            <Route exact path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </>
    )
}

export default App
