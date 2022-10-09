import { GeneralAdvanced, GeneralBasic } from '../constants.js';

export default function GeneralContent({ register, selectedMode }) {

  return (
    <>
      <p>
        I depose $
        <span className='inline-flex'>
            <input type='number' className='input' step={0.000000000000001} {...register('amount')}
                   defaultValue={10000} />
          </span>
        {selectedMode === GeneralAdvanced && <span>
            &nbsp;for a period of&nbsp;
          <span className='inline-flex'>
              <input type='number' className='input input-sm' {...register('years')} defaultValue={1} />
            </span>
          &nbsp;year(s)&nbsp;
          <span className='inline-flex'>
              <input type='number' className='input input-sm' {...register('weeks')} defaultValue={0} />
            </span>
          &nbsp;week(s)&nbsp;
          <span className='inline-flex'>
              <input type='number' className='input input-sm' {...register('days')} defaultValue={0} />
            </span>
          &nbsp;day(s)
          </span>
        }
        &nbsp;and I expect a&nbsp;
        <span className='inline-flex'>
            <input type='number' className='input' step={0.01} {...register('apr')} defaultValue={30} />
          </span>% APR.
      </p>
      {selectedMode === GeneralBasic && <p>
        Claim and compound rewards cost me $
        <span className='inline-flex'>
            <input type='number' className='input' step={0.000000000000001} {...register('cost')} defaultValue={2} />
          </span>.
      </p>
      }
      {selectedMode === GeneralAdvanced && <p>
        Claim rewards cost me $
        <span className='inline-flex'>
            <input type='number' className='input' step={0.000000000000001} {...register('claimCost')}
                   defaultValue={0.5} />
          </span>
        &nbsp;and compound them cost me $
        <span className='inline-flex'>
            <input type='number' className='input' step={0.000000000000001} {...register('compoundCost')}
                   defaultValue={1.5} />
          </span>.
      </p>
      }
    </>
  );
}
