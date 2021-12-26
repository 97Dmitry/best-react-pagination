const range = (count: number): Array<number> => {
  return [...Array(count).keys()].map((i) => i);
};

export default range;
