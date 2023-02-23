import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home';
function App() {
  return (
    <div>
      <header >
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
