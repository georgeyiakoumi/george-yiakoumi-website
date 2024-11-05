import './styles/main.scss';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <Philosophy />
      <Contact />
    </div>
  );
}

export default App;
