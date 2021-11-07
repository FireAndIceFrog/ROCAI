import './App.css';
import YahooTable from './components/YahooTable';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <YahooTable></YahooTable>
      </div>
    </Provider>
  );
}

export default App;
