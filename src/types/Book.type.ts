export enum BookState {
  Favorite = 'Favorite',
  Reading = 'Reading',
  Wish = 'Wish',
  Completed = 'Completed'
}

export type Book = {
  title: string;
  author: string;
  cover: string;
  state: BookState;
  link: string;
};
