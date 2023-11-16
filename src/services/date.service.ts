const addMinuteToDate = (now, minutes) => {
  return new Date(now.getTime() + minutes * 60 * 1000);
};

export { addMinuteToDate };
