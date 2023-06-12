// close modal after given amount of milliseconds
export const autoCloseForm = (delay, dispatch, closingFunction) => {
  const timer = setTimeout(() => {
    dispatch(closingFunction());
  }, delay);
  return timer;
};

export const autoTimer = (delay, timerFunction, arg) => {
  const timer = setTimeout(() => {
    timerFunction(arg);
  }, delay);
  return timer;
};
