import {useForm} from 'react-hook-form';
import ComputeButton from '../compute-button.js';
import { CBAdvanced, CBBasic, GeneralAdvanced, GeneralBasic } from '../constants.js';
import GeneralContent from './general-content.js';
import CbContent from './cb-content.js';

export default function Form({onSubmit, isComputing, selectedMode}) {

  const {register, handleSubmit, formState} = useForm();
  let {isValid} = formState;

  return (
    <form className="flex items-center flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        {(selectedMode === GeneralBasic || selectedMode === GeneralAdvanced) && <GeneralContent register={register} selectedMode={selectedMode}/> }
        {(selectedMode === CBBasic || selectedMode === CBAdvanced) && <CbContent register={register} selectedMode={selectedMode}/> }
      </div>
      <ComputeButton isValid={isValid} isComputing={isComputing}/>
    </form>
  )
}
