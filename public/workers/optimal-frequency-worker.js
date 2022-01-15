onmessage = function (e) {
  // the passed-in data is available via e.data

  postMessage(computeTheOptimalFrequency(e.data.amount, e.data.apr, e.data.cost))
};

function computeTheOptimalFrequency(amount, apr, cost) {
  // 8760 == number of hours in 1 year
  const maxValue = 8760;
  let a = maxValue / 4;
  let b = a * 3;

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

  } while ((newMaxResult <= 0 || getPreciseRound(maxResult) < getPreciseRound(newMaxResult)) && nbComputations < 10000000);

  if (newMaxResult >= 1000000000) {
    newMaxResult = 1000000000;
  }
  console.log('a = ' + a, 'b = ' + b, 'maxFrequency = ' + maxFrequency, 'maxResult = ' + maxResult, 'newMaxResult = ' + newMaxResult, 'nbComputations = ' + nbComputations);
  return {maxIncome: newMaxResult, optimalFrequency: maxFrequency};
}

function getPreciseRound(maxResult) {
  const preciseRound = Math.round(maxResult * 10000);
  return preciseRound <= Number.MAX_SAFE_INTEGER ? preciseRound : Number.MAX_SAFE_INTEGER;
}
