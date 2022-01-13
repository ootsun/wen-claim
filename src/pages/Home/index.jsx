
function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-max bg-white rounded-xl shadow-lg p-8 text-center leading-extra-loose text-xl">
        <p>
          <span className="mr-1">I deposited</span>
          <span className="pink-underline">
            $
            <input type="number" name="amount" id="amount" className="input" value={10000}/>
          </span>
          <span className="mx-1">expecting a</span>
          <span className="pink-underline">
            <input type="number" name="apr" id="apr" className="input" value={30}/>
            %
          </span>
          <span className="ml-1">APR.</span>
        </p>
        <p>
          <span className="mr-1">Claiming and compounding my rewards costs me on average</span>
          <span className="pink-underline">
            $
            <input type="number" name="cost" id="cost" className="input" value={200}/>
          </span>
          .
        </p>
      </div>
      <button type="button" className="compute-button">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Compute
      </button>
      <div className="w-max bg-white rounded-xl shadow-lg p-8 text-center leading-extra-loose text-xl">
        <p>
          <span className="mr-1">Then the optimal claiming frequency is</span>
          <span className="result">2 weeks</span>
          .
        </p>
      </div>
    </div>);
}

export default Home;
