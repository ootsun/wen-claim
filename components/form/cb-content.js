import { GeneralAdvanced, GeneralBasic } from '../constants.js';

export default function CbContent({ register, selectedMode }) {

  return (
    <>
      <p>
        I bond&nbsp;
        <span className='inline-flex'>
            <input type='number' className='input' step={0.000000000000001} {...register('bondAmount')}
                   defaultValue={10000} />
          </span>
        &nbsp;LUSD and the market price of bLUSD is&nbsp;
        <span className='inline-flex'>
            <input type='number' className='input' step={0.000000000000001} {...register('bLUSDMarketPrice')}
                   defaultValue={1.718} />
          </span>
        &nbsp;LUSD. A full bounding cycle costs me&nbsp;
        <span className='inline-flex'>
            <input type='number' className='input' step={0.000000000000001} {...register('CBGasCost')} defaultValue={30} />
          </span>&nbsp;LUSD on gas.
      </p>
    </>
  );
}
