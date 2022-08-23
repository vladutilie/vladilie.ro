export enum BookState {
  Favorite = 'Favorite',
  Reading = 'Reading',
  Wish = 'Wish',
  Completed = 'Completed'
}

export type Book = {
  author: string;
  blurDataUrl: string;
  cover: string;
  link: string;
  state: BookState;
  title: string;
};
