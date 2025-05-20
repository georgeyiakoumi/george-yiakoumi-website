import { ReactComponent as LinkedIn } from '../assets/logos/tools/linkedin.svg';
import { ReactComponent as X } from '../assets/logos/tools/x.svg';
import { ReactComponent as Dribbble } from '../assets/logos/tools/dribbble.svg';
import { ReactComponent as Github } from '../assets/logos/tools/github.svg';
import { ReactComponent as Figma } from '../assets/logos/tools/figma.svg';

const iconMap = {
  LinkedIn,
  X,
  Dribbble,
  Github,
  Figma,
};

export const getIcon = (name) => iconMap[name] || null;