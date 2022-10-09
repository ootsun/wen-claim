import { useState } from 'react';
import humanizeDuration from 'humanize-duration';
import { v4 as uuidv4 } from 'uuid';
import Form from '../components/form/form.js';
import Result from '../components/result.js';
import formatThousands from 'format-thousands';
import Head from 'next/head';
import { CBAdvanced, CBBasic, GeneralAdvanced, GeneralBasic } from '../components/constants.js';

function Home() {
  const HOURS_IN_YEAR = 365 * 24;
  const MAX_RESULT_LIMIT = 1000000000;

  const modes = [GeneralBasic, GeneralAdvanced, CBBasic, CBAdvanced];

  let [isComputing, setIsComputing] = useState(false);
  let [optimalFrequency, setOptimalFrequency] = useState(translateInEnglish(HOURS_IN_YEAR, 17));
  let [maxIncome, setMaxIncome] = useState('3 429.32');
  let [incomeWithoutCompound, setIncomeWithoutCompound] = useState(null);
  let [difference, setDifference] = useState(null);
  let [isError, setIsError] = useState(false);
  let [sessionId] = useState(uuidv4());
  let [prevMetric, setPrevMetric] = useState(null);
  let [selectedMode, setSelectedMode] = useState(modes[0]);

  const onSubmit = formData => {
    setIsComputing(true);
    let amount = parseFloat(formData.amount);
    const apr = parseFloat(formData.apr) / 100;
    let cost;
    let timeHorizonInHours;
    let bLUSDMarketPrice;

    switch (selectedMode) {
      case GeneralBasic:
        cost = parseFloat(formData.cost);
        timeHorizonInHours = HOURS_IN_YEAR;
        break;
      case GeneralAdvanced:
        cost = parseFloat(formData.claimCost) + parseFloat(formData.compoundCost);
        timeHorizonInHours = (HOURS_IN_YEAR * formData.years) + (7 * 24 * formData.weeks) + (24 * formData.days);
        break;
      case CBBasic:
        amount = parseFloat(formData.bondAmount);
        bLUSDMarketPrice = parseFloat(formData.bLUSDMarketPrice);
        cost = parseFloat(formData.CBGasCost);
        timeHorizonInHours = HOURS_IN_YEAR;
        break;
      case CBAdvanced:
        break;
    }

    // (ppr = periodic percentage rate) =/= (apr = annual percentage rate)
    const ppr = apr * timeHorizonInHours / HOURS_IN_YEAR;

    const worker = new Worker('./workers/optimal-frequency-worker.js');
    worker.onmessage = function(event) {
      setIsComputing(false);
      if (!event.data.maxIncome || !event.data.optimalFrequency) {
        setIsError(true);
      } else {
        setIsError(false);
        setMaxIncome(null);
        setOptimalFrequency(null);
        setIncomeWithoutCompound(null);
        setDifference(null);
        switch (selectedMode) {
          case GeneralBasic:
          case CBBasic:
            setMaxIncome(controlAndRound(event.data.maxIncome));
            setOptimalFrequency(translateInEnglish(HOURS_IN_YEAR, event.data.optimalFrequency));
            break;
          case GeneralAdvanced:
          case CBAdvanced:
            const maxIncomeAfterClaim = event.data.maxIncome - formData.claimCost;
            const incomeWithoutCompound = amount * ppr - formData.claimCost;
            if (userDoesntLoseMoney(maxIncomeAfterClaim, incomeWithoutCompound)) {
              if (userEarnMoreWithoutCompound(incomeWithoutCompound, maxIncomeAfterClaim, formData.claimCost)) {
                //If user shouldn't compound
                setMaxIncome(controlAndRound(incomeWithoutCompound));
              } else {
                setMaxIncome(controlAndRound(maxIncomeAfterClaim));
                setOptimalFrequency(translateInEnglish(timeHorizonInHours, event.data.optimalFrequency));
                setIncomeWithoutCompound(controlAndRound(incomeWithoutCompound));
                setDifference(controlAndRound(maxIncomeAfterClaim - incomeWithoutCompound));
              }
            }
            break;
        }
      }
    };
    if(selectedMode === GeneralBasic || selectedMode === GeneralAdvanced) {
      if (timeHorizonInHours <= 0 || amount <= 0 || ppr <= 0 || cost < 0) {
        setIsError(true);
        setIsComputing(false);
      } else {
        worker.postMessage({ amount, ppr, cost, timeHorizonInHours });
      }
      sendMetric(amount, apr, cost);
    } else {
      if (timeHorizonInHours <= 0 || amount <= 0 || bLUSDMarketPrice <= 0 || cost < 0) {
        setIsError(true);
        setIsComputing(false);
      } else {
        worker.postMessage({ amount, bLUSDMarketPrice, cost, timeHorizonInHours });
      }
    }
  };

  function userEarnMoreWithoutCompound(incomeWithoutCompound, maxIncomeAfterClaim, claimCost) {
    return incomeWithoutCompound > maxIncomeAfterClaim && maxIncomeAfterClaim < MAX_RESULT_LIMIT - claimCost;
  }

  function userDoesntLoseMoney(maxIncomeAfterClaim, incomeWithoutCompound) {
    return Math.max(maxIncomeAfterClaim, incomeWithoutCompound) > 0;
  }

  function sendMetric(amount, apr, cost) {
    // Avoid sending metric if no data has changed
    if (prevMetric && prevMetric.amount === amount && prevMetric.apr === apr && prevMetric.cost === cost) {
      return;
    }
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify({ sessionId, amount, apr, cost }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    setPrevMetric({ amount, apr, cost });
  }

  function controlAndRound(number) {
    if (number >= MAX_RESULT_LIMIT) {
      return 'shit ton of 💰💰💰';
    }
    const result = number < 10 ? number : Math.round(number * 100) / 100;
    const resultString = result + '';
    const tokens = resultString.split('.');
    if (tokens.length === 2 && tokens[1].length === 1) {
      return formatThousands(result) + '0';
    }
    return formatThousands(result);
  }

  function translateInEnglish(period, frequency) {
    const hoursUntilFirstClaim = Math.ceil(period / frequency);

    return humanizeDuration(hoursUntilFirstClaim, {
      units: ['y', 'w', 'd', 'h'],
      round: true,
      conjunction: ' and ',
      serialComma: false,
      unitMeasures: {
        y: 365 * 24,
        w: 7 * 24,
        d: 24,
        h: 1
      }
    });
  }

  return (
    <div className='flex items-center flex-col'>
      <Head>
        <title>Wen claim ??!</title>
      </Head>
      <select onChange={(e) => setSelectedMode(e.target.value)} className='select-options'>
        {modes.map(mode => {
            return <option key={mode} value={mode}>{mode}</option>;
          }
        )}
      </select>
      <Form onSubmit={onSubmit} isComputing={isComputing} selectedMode={selectedMode} />
      <Result isError={isError} optimalFrequency={optimalFrequency} maxIncome={maxIncome}
              incomeWithoutCompound={incomeWithoutCompound} difference={difference} />
    </div>);
}

export default Home;