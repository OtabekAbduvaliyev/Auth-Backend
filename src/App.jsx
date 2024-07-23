import UseEffect from "./Hooks/UseEffect"
import UseMemo from "./Hooks/UseMemo"
import UseRef from "./Hooks/UseRef"
import UseState from "./Hooks/UseState"
import { Route, BrowserRouter, Routes, useNavigate, Link } from 'react-router-dom';
import Register from "./Integration With Backend/Register";
import Home from './Home';
import LogIn from "./Integration With Backend/LogIn";
import { AuthContext } from "./Integration With Backend/Auth";
import {useContext,useEffect} from 'react'
import Users from "./Integration With Backend/Components/Users";
import CreateUser from "./Integration With Backend/Components/CreateUsers";

function App() {
  const {logout} = useContext(AuthContext)
  const { currentUser } = useContext(AuthContext);

  const RequiredAuth = ({ children }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!currentUser) {
        navigate('/login');
      }
    }, [currentUser, navigate]);
  
    return currentUser ? children : '';
  };
  // console.log(currentUser);
  return (
      <>
        <header class="text-gray-600 body-font">
          <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span class="ml-3 text-xl">Tailblocks</span>
            </a>
            <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            </nav>
{ !currentUser?           <div className="buttons flex gap-[15px]">
               <Link to='/register'>
              <button class="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
               Register
              </button>
               </Link>
                <Link to='/login'>
              <button class="inline-flex items-center bg-indigo-500 text-white  border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
               Log  In
              </button>
                </Link>
            </div>:
            <div className="buttons flex gap-[15px]">
              <button class="inline-flex items-center bg-indigo-500 text-white  border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
                <Link to='/'>
               Home
                </Link>
              </button>
              <button class="inline-flex items-center bg-indigo-500 text-white  border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
                <Link to='/users'>
               Users
                </Link>
              </button>
              <button class="inline-flex items-center bg-indigo-500 text-white  border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
                <Link to='/createusers'>
               Create Users
                </Link>
              </button>
              <button onClick={logout} class="inline-flex items-center bg-indigo-500 text-white  border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
               Logout
              </button>
              </div>}
          </div>
        </header>
        {/* <UseState /> */}
        {/* <UseEffect /> */}
        {/* <UseMemo /> */}
        {/* <UseRef /> */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<RequiredAuth><Home /></RequiredAuth>} />
          <Route path="/users" element={<RequiredAuth><Users /></RequiredAuth>} />
          <Route path="/createusers" element={<RequiredAuth><CreateUser /></RequiredAuth>} />
        </Routes>
      </>
  )
}

export default App
