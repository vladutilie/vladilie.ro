import { Burger, Fireworks, XmasHat } from '../icons';

export const BurgerMenu: React.FC = () => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();
  const isChristmasTime = currentMonth === 12 && currentDay >= 1 && currentDay <= 26;
  const isNewYearTime = (currentMonth === 12 && currentDay >= 27) || (currentMonth === 1 && currentDay <= 2);

  return isChristmasTime ? <XmasHat /> : isNewYearTime ? <Fireworks /> : <Burger />;
};
