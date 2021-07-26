import './App.css';
import Game from'./components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Loteria</h1>
      </header>
      <main id="Main-content">
        <Game/>
      </main>
    </div>
  );
}

export default App;
