import logo from './logo.svg';
import './App.css';

function App(props) {
  const subject = props.subject;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola, {subject} !
        </p>  
        
      </header>
    </div>
  );
}

export default App;
