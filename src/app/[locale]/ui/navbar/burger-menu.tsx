import { Burger, Easter, Fireworks, NationalDay, Pumpkin, XmasHat } from '../icons';

export const BurgerMenu: React.FC = () => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();

  const isChristmasTime = currentMonth === 12 && currentDay >= 1 && currentDay <= 26;
  const isNewYearTime = (currentMonth === 12 && currentDay >= 27) || (currentMonth === 1 && currentDay <= 3);
  const isEasterTime = currentMonth === 5 && currentDay >= 1 && currentDay <= 9;
  const isHalloweenTime = (currentMonth === 10 && currentDay >= 29) || (currentMonth === 11 && currentDay <= 3);
  const isNationalDayTime = currentMonth === 12 && currentDay === 1;

  return isChristmasTime ? (
    <XmasHat />
  ) : isNewYearTime ? (
    <Fireworks />
  ) : isEasterTime ? (
    <Easter />
  ) : isHalloweenTime ? (
    <Pumpkin />
  ) : isNationalDayTime ? (
    <NationalDay />
  ) : (
    <Burger />
  );
};
