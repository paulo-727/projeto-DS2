import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Home2 from './Components/Home2'
import Funcionarios from './Components/Funcionarios'
import Cargos from './Components/Cargos'
import AddCargo from './Components/AddCargo'
import AddFuncionario from './Components/AddFuncionario'
import EditFuncionarios from './Components/EditFuncionarios'



function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/Home' element={<Home/>}>
          <Route path='' element={<Home2/>}></Route>
          <Route path='/Home/Funcionarios' element={<Funcionarios/>}></Route>
          <Route path='/Home/Cargos' element={<Cargos/>}></Route>
          <Route path='/Home/add_cargo' element={<AddCargo/>}></Route>
          <Route path='/Home/add_funcionario' element={<AddFuncionario/>}></Route>
          <Route path='/Home/edit_funcionarios/:id' element={<EditFuncionarios/>}></Route>
          
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
