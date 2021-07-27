import './App.css';
import Game from'./components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Millennial Lotería</h1>
      </header>
      <main id="Main-content">
        <Game/>
      </main>
      <footer> Capstone Project C15 Accelerate - Denisse Anaya</footer>
    </div>
  );
}

export default App;
