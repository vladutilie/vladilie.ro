export const scrollTo = (whereToId: string): void => {
  const elementTop = Number(document.getElementById(whereToId)?.getBoundingClientRect().top);
  const bodyTop = document.body.getBoundingClientRect().top;
  const offset = 72; // px

  window.scrollTo({ behavior: 'smooth', top: elementTop - bodyTop - offset });
};
