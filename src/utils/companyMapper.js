import { ReactComponent as Novartis } from '../assets/logos/businesses/novartis.svg';
import { ReactComponent as GoFundMe } from '../assets/logos/businesses/gofundme.svg';
import { ReactComponent as HP } from '../assets/logos/businesses/hp.svg';
import { ReactComponent as Ocean } from '../assets/logos/businesses/ocean.svg';
import { ReactComponent as Takeda } from '../assets/logos/businesses/takeda.svg';
import { ReactComponent as Wickes } from '../assets/logos/businesses/wickes.svg';
import { ReactComponent as JohnsonAndJohnson } from '../assets/logos/businesses/johnson-johnson.svg';

const companyMap: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  Novartis,
  GoFundMe,
  HP,
  Ocean,
  Takeda,
  Wickes,
  JohnsonAndJohnson,
};

export const getCompany = (name: string) => companyMap[name] || null;