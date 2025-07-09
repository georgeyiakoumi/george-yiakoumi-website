import { ReactComponent as AdobeAfterEffectsCC } from '../assets/logos/tools/adobe-after-effects-cc.svg';
import { ReactComponent as AdobeIllustratorCC } from '../assets/logos/tools/adobe-illustrator-cc.svg';
import { ReactComponent as AdobePhotoshopCC } from '../assets/logos/tools/adobe-photoshop-cc.svg';
import { ReactComponent as AdobePremiereProCC } from '../assets/logos/tools/adobe-premiere-pro-cc.svg';
import { ReactComponent as AvidProTools } from '../assets/logos/tools/avid-pro-tools.svg';
import { ReactComponent as Blender } from '../assets/logos/tools/blender.svg';
import { ReactComponent as Cloudflare } from '../assets/logos/tools/cloudflare.svg';
import { ReactComponent as Cloudinary } from '../assets/logos/tools/cloudinary.svg';
import { ReactComponent as CSS3 } from '../assets/logos/tools/css3.svg';
import { ReactComponent as Dribbble } from '../assets/logos/tools/dribbble.svg';
import { ReactComponent as Figma } from '../assets/logos/tools/figma.svg';
import { ReactComponent as FramerMotion } from '../assets/logos/tools/framer-motion.svg';
import { ReactComponent as Github } from '../assets/logos/tools/github.svg';
import { ReactComponent as Godaddy } from '../assets/logos/tools/godaddy.svg';
import { ReactComponent as Gsap } from '../assets/logos/tools/gsap.svg';
import { ReactComponent as HTML5 } from '../assets/logos/tools/html5.svg';
import { ReactComponent as JS } from '../assets/logos/tools/js.svg';
import { ReactComponent as LinkedIn } from '../assets/logos/tools/linkedin.svg';
import { ReactComponent as Lottiefiles } from '../assets/logos/tools/lottiefiles.svg';
import { ReactComponent as Miro } from '../assets/logos/tools/miro.svg';
import { ReactComponent as Netlify } from '../assets/logos/tools/netlify.svg';
import { ReactComponent as React } from '../assets/logos/tools/react.svg';
import { ReactComponent as Render } from '../assets/logos/tools/render.svg';
import { ReactComponent as Sass } from '../assets/logos/tools/sass.svg';
import { ReactComponent as Strapi } from '../assets/logos/tools/strapi.svg';
import { ReactComponent as Supabase } from '../assets/logos/tools/supabase.svg';
import { ReactComponent as ThreeJS } from '../assets/logos/tools/threejs.svg';
import { ReactComponent as Webflow } from '../assets/logos/tools/webflow.svg';
import { ReactComponent as X } from '../assets/logos/tools/x.svg';

const toolsMap = {
  'adobe-after-effects-cc': AdobeAfterEffectsCC,
  'adobe-illustrator-cc': AdobeIllustratorCC,
  'adobe-photoshop-cc': AdobePhotoshopCC,
  'adobe-premiere-pro-cc': AdobePremiereProCC,
  'avid-pro-tools': AvidProTools,
  'blender': Blender,
  'cloudflare': Cloudflare,
  'cloudinary': Cloudinary,
  'css3': CSS3,
  'dribbble': Dribbble,
  'figma': Figma,
  'framer-motion': FramerMotion,
  'github': Github,
  'godaddy': Godaddy,
  'gsap': Gsap,
  'html5': HTML5,
  'js': JS,
  'linkedin': LinkedIn,
  'lottiefiles': Lottiefiles,
  'miro': Miro,
  'netlify': Netlify,
  'react': React,
  'render': Render,
  'sass': Sass,
  'strapi': Strapi,
  'supabase': Supabase,
  'threejs': ThreeJS,
  'webflow': Webflow,
  'x': X,
};

export const getToolIcon = (slug) => toolsMap[slug] || null;