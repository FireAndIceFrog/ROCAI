import './App.css';
import YahooTable from './components/YahooTable';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const endDate = new Date('08/21/2020');
  const startDate= new Date('08/1/2020');
  return (
    <Provider store={store}>
      <div className="App">
        <YahooTable ticker = "AAPL" startDate={startDate} endDate={endDate}></YahooTable>
      </div>
    </Provider>
  );
}

export default App;
