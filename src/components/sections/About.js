import CtaButton from '../../components/ui/CtaButton';
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';

function About() {
    return (
      <section className="about">
        <h2>About Me</h2>
        <p>With experience across finance, pharma, non-profits, and AI, I specialize in UI, motion, and design systems.</p>
        <HomeIcon fontSize="large" color="primary" />
        <PaletteIcon />
        <HomeIcon />
        <HomeIcon />
        <CtaButton 
          label="Primary button"
          size="large" 
          variant="primary" 
          iconLeft={<HomeIcon />} 
          onClick={() => alert('Primary button clicked')}
          />
        <ul>
          <li>Driven by curiosity and selective about projects.</li>
          <li>Focused on solving real problems, not assumptions.</li>
          <li>I ask tough questions to uncover clients’ real needs.</li>
        </ul>
      </section>
    );
  }
  
  export default About;  