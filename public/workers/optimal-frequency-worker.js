onmessage = function (e) {
  postMessage(computeTheOptimalFrequency(e.data.amount, e.data.apr, e.data.cost))
};

function computeTheOptimalFrequency(amount, apr, cost) {
  // 8760 == number of hours in 1 year
  const maxValue = 365 * 24;

  // Don't waste time computing something unrealistic
  const maxResultLimit = 1000000000;
  const maxNbComputations = 10000000;

  // Define the two starting point
  let a = maxValue / 4;
  let b = a * 3;

  // This function returns the value of a position (amount + yearly earnings) after 1 year
  // where x is the yearly frequency of harvests
  const fx = (x) => amount * (Math.pow(1 + apr / x, x) - 1) - (x * cost);

  let maxResult;
  let newMaxResult = 0;
  let maxFrequency;
  let step = 1;
  let nbComputations = 0;

  do {
    nbComputations++;
    maxResult = newMaxResult;

    let fxa = fx(a);
    newMaxResult = Math.max(fxa, fx(b));

    maxFrequency = fxa === newMaxResult ? a : b;

    a = maxFrequency - step >= 0 ? maxFrequency - step : 0;
    b = maxFrequency + step <= maxValue ? maxFrequency + step : maxValue;

    if((a === 0 || nbComputations === 100) && step === 1) {
      step /= 100;
      a = maxFrequency - step >= 0 ? maxFrequency - step : 0;
      b = maxFrequency + step <= maxValue ? maxFrequency + step : maxValue;
    }

  } while ((newMaxResult <= 0 || getPreciseRound(maxResult) < getPreciseRound(newMaxResult)) && nbComputations < maxNbComputations);

  if (newMaxResult >= maxResultLimit) {
    newMaxResult = maxResultLimit;
  }
  // console.log('a = ' + a, 'b = ' + b, 'maxFrequency = ' + maxFrequency, 'maxResult = ' + maxResult, 'newMaxResult = ' + newMaxResult, 'nbComputations = ' + nbComputations);
  return {maxIncome: newMaxResult, optimalFrequency: maxFrequency};
}

function getPreciseRound(maxResult) {
  const preciseRound = Math.round(maxResult * 10000);
  return preciseRound <= Number.MAX_SAFE_INTEGER ? preciseRound : Number.MAX_SAFE_INTEGER;
}
