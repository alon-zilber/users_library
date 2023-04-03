
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Layout } from './layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default App;
