export enum BoardgameState {
  Own = 'Own',
  Wish = 'Wish'
}

export type Boardgame = {
  age: string;
  duration: string;
  image: string;
  name: string;
  players: string;
  state: BoardgameState;
  tags: string[];
  link: string;
};
