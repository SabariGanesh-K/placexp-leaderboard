import logo from './logo.svg';
import './App.css';
import { Main } from './components/Main/Main';
import { AppProvider } from './context/AppConfig';

function App() {
  return (
    <div className="App">
      <AppProvider>
     <Main/>
     </AppProvider>
    </div>
  );
}

export default App;
