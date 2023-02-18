import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

import ProfileCardList from './pages/profileCardList';
import ProfileCardDetail from './pages/ProfileCardDetail';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ProfileCardList} />
      <Route path="/:profileCardId" component={ProfileCardDetail} />
    </Switch>
  </Router>
);

export default App;
