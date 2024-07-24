import './App.css'
import Head from './Components/Head'
import Body from './Components/Body'
import { Routes, Route } from 'react-router-dom'
import RestaurantMenu from './Components/RestaurantMenu'
import { Coordinates, ResInformation } from './context/contextApi'
import {  useState } from 'react'
import Cart from './Components/Cart'
import Search from './Components/Search'
import { useSelector } from 'react-redux'

function App() {

  //  getting data using usecontext method
  // const [visible, setvisible] = useState(false)

  // getting data using Redux Method 
  const visible = useSelector((state) => state.toogleslice.searchBarToogle)
  const Loginvisible = useSelector((state) => state.toogleslice.loginToggle)

  const [coor, setcoor] = useState({ lat: 28.4916812, lng: 77.094897 })

  const [ResInfo, setResInfo] = useState([])




  return (
    <>
      <ResInformation.Provider value={{ ResInfo, setResInfo }}>
        <Coordinates.Provider value={{ coor, setcoor }}>
          <div className={Loginvisible ? "max-h-screen overflow-hidden" : ""}>
            <div className={visible ? "max-h-screen overflow-hidden" : ""}>
              <Routes>
                <Route path='/' element={<Head />}>
                  <Route path='/' element={<Body />}></Route>
                  <Route path='/RestaurantMenu/:id' element={<RestaurantMenu />}></Route>  {/*we write in path :id means it is a variable not the url we can store any value in it and we use Link tag in RestaurantCard component to set the value of the id variable and use  useParams hook to excess the value of id variable  in RestaurantMenu component */}
                  <Route path='/cart' element={<Cart />}></Route>
                  <Route path='/search' element={<Search />}></Route>
                  <Route path='*' element={<h1>Comming Sooon.......</h1>}></Route>
                </Route>
              </Routes>
                
            </div>
          </div>
        </Coordinates.Provider>
      </ResInformation.Provider>
    </>
  )
}

export default App
