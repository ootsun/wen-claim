export default function Result({isError, isBasic, optimalFrequency, maxIncome, incomeWithoutCompound, difference}) {
  let result = [];
  if (!isError) {
    if (maxIncome !== null) {
      if (optimalFrequency !== null) {
        const period = isBasic ? 'per year' : 'at the end of the period';
        result.push(<span key="part1">
            The optimal frequency for claiming rewards is&nbsp;
            <span className="result">{optimalFrequency}</span>
            &nbsp;and it will make me earn&nbsp;
            <span className="result">${maxIncome}</span>
            &nbsp;{period}.</span>);
        if (incomeWithoutCompound) {
          result.push(<span key="part2">
              <br/>Without compounding, it will make me earn&nbsp;
              <span className="result">${incomeWithoutCompound}</span>
              &nbsp;{period}. This represents a difference of&nbsp;
              <span className="result">${difference}.</span>
            </span>);
        }
      } else {
        result.push(<span key="part1">I shouldn't compound my rewards. The fees are too high... But if I just claim at the end of the
          &nbsp;period, I should earn&nbsp;<span className="result">${maxIncome}</span>.</span>);
      }
    } else {
      result.push(<span key="part1">I shouldn't farm. The fees are too high...</span>);
    }
  }
  return (
    <div className="card">
      {!isError && <p>{result}</p>}
      {isError &&
        <p className="result">The numbers you passed doesn't seem realistic. Please, correct the information.</p>}
    </div>
  );
}
