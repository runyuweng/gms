import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';

class App extends React.Component {
   render() {
      return (
         <div>
            <Link to="/login/">login </Link>
         </div>
      );
   }
}

export default App;
