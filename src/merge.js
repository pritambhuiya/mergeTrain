const remainingDistance = (bogie) => bogie[2];

const merge = (bogiesA, bogiesB) => {
  if (!bogiesB.length) {
    return bogiesA;
  }

  if (!bogiesA.length) {
    return bogiesB;
  }

  const firstBogieA = bogiesA[0];
  const firstBogieB = bogiesB[0];

  if (remainingDistance(firstBogieA) < remainingDistance(firstBogieB)) {
    return [firstBogieA].concat(merge(bogiesA.slice(1), bogiesB));
  }

  return [firstBogieB].concat(merge(bogiesA, bogiesB.slice(1)));
};

module.exports = { merge };
