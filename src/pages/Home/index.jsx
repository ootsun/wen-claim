import {useForm} from 'react-hook-form';
import {useState} from 'react';
import Duration from 'duration';
import {v4 as uuidv4} from 'uuid';

function Home() {

  const {register, handleSubmit, formState} = useForm();
  let {isValid} = formState;
  let [isComputing, setIsComputing] = useState(false);
  let [optimalFrequency, setOptimalFrequency] = useState(translateInEnglish(17.2));
  let [maxIncome, setMaxIncome] = useState(3429.32);
  let [isError, setIsError] = useState(false);
  let [sessionId] = useState(uuidv4());
  let [prevMetric, setPrevMetric] = useState(null);

  const onSubmit = data => {
    setIsComputing(true);
    const amount = parseInt(data.amount);
    const apr = parseInt(data.apr) / 100;
    const cost = parseInt(data.cost);

    const worker = new Worker('./workers/optimal-frequency-worker.js');
    worker.onmessage = function (event) {
      setIsComputing(false);
      if (!event.data.maxIncome || !event.data.optimalFrequency) {
        setIsError(true);
      } else {
        setIsError(false);
        setMaxIncome(controlAndRound(event.data.maxIncome));
        setOptimalFrequency(translateInEnglish(event.data.optimalFrequency));
      }
    };
    worker.postMessage({amount, apr, cost});
    sendMetric(amount, apr, cost);
  }

  function sendMetric(amount, apr, cost) {
    // Avoid sending metric if no data has changed
    if (prevMetric && prevMetric.amount === amount && prevMetric.apr === apr && prevMetric.cost === cost) {
      return;
    }
    fetch(process.env.REACT_APP_METRIC_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        amount,
        apr,
        cost
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    setPrevMetric({amount, apr, cost});
  }

  function controlAndRound(maxIncome) {
    if (maxIncome >= 1000000000) {
      return 'shit ton of 💰💰💰';
    }
    return Math.round(maxIncome * 100) / 100;
  }

  function translateInEnglish(frequency) {
    const hoursInAYear = 365 * 24;
    const hoursUntilFirstClaim = hoursInAYear / frequency;

    const firstClaim = new Date();
    firstClaim.setHours(firstClaim.getHours() + hoursUntilFirstClaim);

    const duration = new Duration(new Date(), firstClaim);

    let str = '';
    if (duration.year > 0) {
      str += duration.year + ' year(s)';
    }
    if (duration.month > 0) {
      if (str) {
        str += ' ';
      }
      str += duration.month + ' month(s)';
    }
    if (duration.day > 0) {
      if (str) {
        str += ' ';
      }
      str += duration.day + ' day(s)';
    }
    if (!str) {
      if (duration.hour > 0) {
        str = duration.hour + ' hour(s)';
      } else {
        str = '1 hour';
      }
    }
    return str;
  }

  return (
    <div className="flex items-center flex-col mt-5">
      <form className="flex items-center flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          <p>
            <span className="mr-1">I depose</span>
            $
            <span className="inline-flex">
              <input type="number" className="input" step={0.01}
                     {...register('amount', {required: 'Mandatory field'})} defaultValue={10000}/>
              {formState.errors.amount && <span className="error-message">{formState.errors.amount.message}</span>}
            </span>
            <span className="mx-1">and I expect a</span>
            <span className="inline-flex">
              <input type="number" className="input" step={0.01}
                     {...register('apr', {required: 'Mandatory field'})} defaultValue={30}/>
              {formState.errors.apr && <span className="error-message">{formState.errors.apr.message}</span>}
            </span>%
            <span className="ml-1">APR.</span>
          </p>
          <p>
            <span className="mr-1">Claim and compound rewards cost me</span>
            $<span className="inline-flex">
              <input type="number" className="input" step={0.01}
                     {...register('cost', {required: 'Mandatory field'})} defaultValue={2}/>
            {formState.errors.cost && <span className="error-message">{formState.errors.cost.message}</span>}
            </span>
          </p>
        </div>
        <button type="submit" disabled={!isValid || isComputing} className="compute-button">
          {isComputing &&
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
          Compute
        </button>
      </form>
      <div className="card">
        {!isError && <p>
          <span className="mr-1">The optimal frequency for claiming rewards is</span>
          <span className="result">{optimalFrequency}</span>
          <span className="mx-1">and it will make me earn</span>
          <span className="result">${maxIncome}</span>
          <span className="ml-1">per year.</span>
        </p>}
        {isError &&
          <p className="result">The numbers you passed doesn't seem realistic. Please, correct the information.</p>}
      </div>
    </div>);
}

export default Home;
