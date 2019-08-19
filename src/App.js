import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import List from './List'

const Home = () => <h1>Home</h1>

const App = () =>(
  <div>
  <Router>
    <Link to="/"> <h3> Art Map</h3> </Link>
    <Link to="/list"> <h3> List</h3> </Link>
    <Route exact path="/" component={Home} />
    <Route path="/list" component={List} />
  </Router>
  </div>
)

export default App;



// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Home from './pages/Home';
// import List from './pages/List';
// import './App.css';

// export default function App() {
//   let sayHi = 'adadg';
//   useEffect(() => {
//     fetch('/')
//       .then(response => response.text())
//       .then(data => console.log('the data', data))
//   }, [])

//   return (
//     <div className="App">
//       <Router>
//         <Switch>
//           <Route exact path='/' component={Home} />
//           <Route path='/list' component={List} />
//         </Switch>
//       </Router>
//     </div>
//   );
// }

