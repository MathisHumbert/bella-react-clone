import Hero from '../components/Hero';
import Blog from '../components/Blog';
import Loader from '../components/Loader';
import Header from '../components/Header';

function Portfolio() {
  return (
    <>
      <Loader />
      <Header />
      <main id='main'>
        <Hero />
        <Blog
          side='left'
          color='white'
          headingNumber='003 -'
          headingSection='Blog'
          heading='Quae Accusamus Consequuntur Sequi Ullam'
          paragraph='17.08.20'
        />
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

export default Portfolio;
