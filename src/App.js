import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login2 from './Login'
import Register2 from './Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login2/>} />
          <Route path = "/register" element = {<Register2/>} />
          <Route path = "/file" element = {<>Hello</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
