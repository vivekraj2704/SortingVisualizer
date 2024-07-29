import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'

function App() {
  return (
    <div className="App">
      <div className= "m-10 border-solid border-2 border-black min-h-screen">
      <SortingVisualizer></SortingVisualizer>
      </div>
    </div>
  );
}

export default App;
