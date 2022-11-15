import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import RevealGallery from './components/RevealGallery';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <Layout>
      <Header />
      <Hero />
      <RevealGallery />
      <Portfolio />
    </Layout>
  );
}

export default App;
