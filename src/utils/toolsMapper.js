import { ReactComponent as AdobeAfterEffectsCC } from '../assets/logos/tools/adobe-after-effects-cc.svg';
import { ReactComponent as AdobePremiereProCC } from '../assets/logos/tools/adobe-premiere-pro-cc.svg';
import { ReactComponent as Cloudflare } from '../assets/logos/tools/cloudflare.svg';
import { ReactComponent as Cloudinary } from '../assets/logos/tools/cloudinary.svg';
import { ReactComponent as Dribbble } from '../assets/logos/tools/dribbble.svg';
import { ReactComponent as Figma } from '../assets/logos/tools/figma.svg';
import { ReactComponent as FramerMotion } from '../assets/logos/tools/framer-motion.svg';
import { ReactComponent as Github } from '../assets/logos/tools/github.svg';
import { ReactComponent as Godaddy } from '../assets/logos/tools/godaddy.svg';
import { ReactComponent as Gsap } from '../assets/logos/tools/gsap.svg';
import { ReactComponent as LinkedIn } from '../assets/logos/tools/linkedin.svg';
import { ReactComponent as Lottiefiles } from '../assets/logos/tools/lottiefiles.svg';
import { ReactComponent as Miro } from '../assets/logos/tools/miro.svg';
import { ReactComponent as Netlify } from '../assets/logos/tools/netlify.svg';
import { ReactComponent as React } from '../assets/logos/tools/react.svg';
import { ReactComponent as Render } from '../assets/logos/tools/render.svg';
import { ReactComponent as Sass } from '../assets/logos/tools/sass.svg';
import { ReactComponent as Strapi } from '../assets/logos/tools/strapi.svg';
import { ReactComponent as Supabase } from '../assets/logos/tools/supabase.svg';
import { ReactComponent as X } from '../assets/logos/tools/x.svg';

const toolsMap = {
  'adobe-after-effects-cc': AdobeAfterEffectsCC,
  'adobe-premiere-pro-cc': AdobePremiereProCC,
  'cloudflare': Cloudflare,
  'cloudinary': Cloudinary,
  'dribbble': Dribbble,
  'figma': Figma,
  'framer-motion': FramerMotion,
  'github': Github,
  'godaddy': Godaddy,
  'gsap': Gsap,
  'linkedin': LinkedIn,
  'lottiefiles': Lottiefiles,
  'miro': Miro,
  'netlify': Netlify,
  'react': React,
  'render': Render,
  'sass': Sass,
  'strapi': Strapi,
  'supabase': Supabase,
  'x': X,
};

export const getToolIcon = (slug) => toolsMap[slug] || null;