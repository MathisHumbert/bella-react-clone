import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import RevealGallery from './components/RevealGallery';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';

function App() {
  return (
    <Layout>
      <Header />
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
      <Blog
        side='right'
        color='black'
        headingNumber='005 -'
        headingSection='Contact'
        heading='Quae Accusamus Consequuntur'
        paragraph='Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sed.'
      />
    </Layout>
  );
}

export default App;
