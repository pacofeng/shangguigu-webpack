import React, { Suspense, lazy } from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import About from './pages/About';

// 懒加载route page
const Home = lazy(() => import(/* webpackChunkName: 'homee' */ './pages/Home'));
const About = lazy(() =>
  import(/* webpackChunkName: 'aboutt' */ './pages/About')
);

const App = () => (
  <Router>
    <ul>
      <li>
        <Link to='/home'>Home</Link>
      </li>{' '}
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
