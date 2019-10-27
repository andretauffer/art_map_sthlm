export default (...hoc) => Component => {
  const func1 = hoc[0];
  const func2 = hoc[1];
  let Accumulator = func2(func1(Component));
  for (let i = 2; i < hoc.length; i += 1) {
    const funcs = hoc[i];
    Accumulator = funcs(Accumulator);
  }
  return Accumulator;
};
