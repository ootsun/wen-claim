onmessage = function (e) {
  postMessage(computeTheOptimalFrequency(e.data.amount, e.data.ppr, e.data.cost, e.data.timeHorizonInHours))
};

// (ppr = periodic percentage rate) =/= (apr = annual percentage rate)
function computeTheOptimalFrequency(amount, ppr, cost, timeHorizonInHours) {
  // Don't waste time computing something unrealistic
  const MAX_NB_COMPUTATIONS = 10000000;
  const MAX_RESULT_LIMIT = 1000000000;
  // Define the two starting point
  let a = Math.ceil(timeHorizonInHours / 4);
  let b = a * 3;

  // This function returns the value of a position (amount + periodic earnings) after 1 period
  // where x is the periodic frequency of harvests
  const fx = (x) => amount * (Math.pow(1 + ppr / x, x) - 1) - (x * cost);

  let prevMaxResult;
  let newMaxResult = 0;
  let prevMaxFrequency;
  let newMaxFrequency;
  let nbComputations = 0;

  do {
    nbComputations++;
    prevMaxResult = newMaxResult;
    prevMaxFrequency = newMaxFrequency;

    let fxa = fx(a);
    newMaxResult = Math.max(fxa, fx(b));

    newMaxFrequency = fxa === newMaxResult ? a : b;

    a = newMaxFrequency - 1 >= 0 ? newMaxFrequency - 1 : 0;
    b = newMaxFrequency + 1 <= timeHorizonInHours ? newMaxFrequency + 1 : timeHorizonInHours;

  } while ((newMaxResult <= 0 || getPreciseRound(prevMaxResult) < getPreciseRound(newMaxResult)) && nbComputations < MAX_NB_COMPUTATIONS);

  let finalMaxResult;
  let finalMaxFrequency;
  if(newMaxResult > prevMaxResult) {
    finalMaxResult = newMaxResult;
    finalMaxFrequency = newMaxFrequency;
  } else {
    finalMaxResult = prevMaxResult;
    finalMaxFrequency = prevMaxFrequency;
  }
  if (finalMaxResult >= MAX_RESULT_LIMIT) {
    finalMaxResult = MAX_RESULT_LIMIT;
  }
  // console.log('a = ' + a, 'b = ' + b, 'newMaxFrequency = ' + newMaxFrequency, 'finalMaxFrequency = ' + finalMaxFrequency, 'prevMaxResult = ' + prevMaxResult, 'newMaxResult = ' + newMaxResult, 'finalMaxResult = ' + finalMaxResult, 'nbComputations = ' + nbComputations);
  return {maxIncome: finalMaxResult, optimalFrequency: finalMaxFrequency};
}

function getPreciseRound(maxResult) {
  const preciseRound = Math.round(maxResult * 10000000000);
  return preciseRound <= Number.MAX_SAFE_INTEGER ? preciseRound : Number.MAX_SAFE_INTEGER;
}
