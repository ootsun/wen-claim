import {useForm} from 'react-hook-form';
import ComputeButton from './compute-button.js';

export default function Form({onSubmit, isComputing, isBasic}) {

  const {register, handleSubmit, formState} = useForm();
  let {isValid} = formState;

  return (
    <form className="flex items-center flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <p>
          I depose $
          <span className="inline-flex">
            <input type="number" className="input" step={0.000000000000001} {...register('amount')} defaultValue={10000}/>
          </span>
          {!isBasic && <span>
            &nbsp;for a period of&nbsp;
            <span className="inline-flex">
              <input type="number" className="input input-sm" {...register('years')} defaultValue={1}/>
            </span>
            &nbsp;year(s)&nbsp;
            <span className="inline-flex">
              <input type="number" className="input input-sm" {...register('weeks')} defaultValue={0}/>
            </span>
            &nbsp;week(s)&nbsp;
            <span className="inline-flex">
              <input type="number" className="input input-sm" {...register('days')} defaultValue={0}/>
            </span>
            &nbsp;day(s)
          </span>}
          &nbsp;and I expect a&nbsp;
          <span className="inline-flex">
            <input type="number" className="input" step={0.01} {...register('apr')} defaultValue={30}/>
          </span>% APR.
        </p>
        {isBasic && <p>
          Claim and compound rewards cost me $
          <span className="inline-flex">
            <input type="number" className="input" step={0.000000000000001} {...register('cost')} defaultValue={2}/>
          </span>.
        </p>
        }
        {!isBasic && <p>
          Claim rewards cost me $
          <span className="inline-flex">
            <input type="number" className="input" step={0.000000000000001} {...register('claimCost')} defaultValue={0.5}/>
          </span>
          &nbsp;and compound them cost me $
          <span className="inline-flex">
            <input type="number" className="input" step={0.000000000000001} {...register('compoundCost')} defaultValue={1.5}/>
          </span>.
        </p>
        }
      </div>
      <ComputeButton isValid={isValid} isComputing={isComputing}/>
    </form>
  )
}
