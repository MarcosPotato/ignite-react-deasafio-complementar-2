import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import { FoodProvider } from './hooks/Food';

import GlobalStyle from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <FoodProvider>
      <Router>
        <Routes />
      </Router>
    </FoodProvider>
  </>
);

export default App;
