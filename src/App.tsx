import { useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import Header from './components/Header';
import Hero from './components/Hero';
import RevealGallery from './components/RevealGallery';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Work from './components/Work';
import Loader from './components/Loader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  let bodyScrollBar: any;

  useEffect(() => {
    bodyScrollBar = Scrollbar.init(document.querySelector('.main-scrollbar')!, {
      damping: 0.07,
      // delegateTo: document,
    });

    // remove horizontal scrollbar
    bodyScrollBar.track.xAxis.element.remove();

    // Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value; // setter
        }
        return bodyScrollBar.scrollTop; // getter
      },
    });

    console.log(bodyScrollBar);

    bodyScrollBar.addListener(ScrollTrigger.update);

    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);

  return (
    <>
      <Loader />
      <Header />
      <div className='main-scrollbar'>
        <Hero />
        <RevealGallery />
        <Portfolio />
        <Blog
          side='left'
          color='white'
          headingNumber='003 -'
          headingSection='Blog'
          heading='Quae Accusamus Consequuntur Sequi Ullam'
          paragraph='17.08.20'
        />
        <Work />
        <Blog
          side='right'
          color='black'
          headingNumber='005 -'
          headingSection='Contact'
          heading='Quae Accusamus Consequuntur'
          paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sed.'
        />
        <aside
          className='fill__background'
          style={{ backgroundColor: 'rgb(172, 183, 174)' }}
        ></aside>
      </div>
    </>
  );
}

export default App;
