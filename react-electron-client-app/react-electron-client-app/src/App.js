import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/components.css';
import './assets/css/core.css';
import './assets/css/icons.css';
import './assets/css/pages.css';
import './assets/css/responsive.css';

import { Header } from './components/header/header';

function App() {
  return (
    <div className="main_app">
      <div id="loading"></div>
      <div className="container">
        <Header />
      </div>
    </div>
  );
}

export default App;
