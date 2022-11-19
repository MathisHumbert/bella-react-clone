import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { PageProvider } from './contexts/pageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <PageProvider>
      <App />
    </PageProvider>
  </Router>
);
