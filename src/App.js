import './App.css';
import { Home } from './screens'
function App () {
  return (
    <div className="App">
      <div className="header">
        <a className="a" href="/">
          <img src="https://123milhas.com/img/logo123.svg" alt="123 Milhas" />
        </a>
      </div>
      <Home />
    </div>
  );
}

export default App;
