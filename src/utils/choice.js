const getChoice = (choiceList) => {
  const idx = Math.floor(Math.random() * choiceList.length);
  return choiceList[idx];
};

module.exports = { getChoice };
