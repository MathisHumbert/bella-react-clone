import { Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ScrollToTop from './components/ScrollToTop';

const lenis = new Lenis({
  // @ts-ignore
  lerp: 0.01,
  smooth: true,
  direction: 'vertical',
});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
    </>
  );
}
