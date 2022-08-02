const merge = (bogiesA, bogiesB) => {
  if (!bogiesB.length) {
    return bogiesA;
  }

  if (!bogiesA.length) {
    return bogiesB;
  }

  const [firstBogieA] = bogiesA;
  const [firstBogieB] = bogiesB;

  const [, , remainingDistanceOfFirstBogieA] = firstBogieA;
  const [, , remainingDistanceOfFirstBogieB] = firstBogieB;

  if (remainingDistanceOfFirstBogieA < remainingDistanceOfFirstBogieB) {
    return [firstBogieA].concat(merge(bogiesA.slice(1), bogiesB));
  }
  return [firstBogieB].concat(merge(bogiesA, bogiesB.slice(1)));
};

module.exports = { merge };
