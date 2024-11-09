import './styles/main.scss';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Philosophy from './components/sections/Philosophy';
import Contact from './components/sections/Contact';

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
