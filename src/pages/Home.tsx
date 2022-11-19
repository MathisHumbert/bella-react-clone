import Header from '../components/Header';
import Hero from '../components/Hero';
import RevealGallery from '../components/RevealGallery';
import Portfolio from '../components/Portfolio';
import Blog from '../components/Blog';
import Work from '../components/Work';
import Loader from '../components/Loader';

function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main id='main'>
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
      </main>
    </>
  );
}

export default Home;
