export default function SwitchForm({isBasic, setIsBasic}) {

  function toggleLabelUnderline($event){
    setIsBasic(!$event.target.checked)
  }

  return (
    <div className="flex items-center">
      <div className="w-24 text-right uppercase">
        <span className={isBasic ? "switch-form-basic-label-selected" : ""}>Basic</span>
      </div>
      <label className="switch my-5 mx-2">
        <input type="checkbox" className="switch-input" onChange={toggleLabelUnderline}/>
        <span className="slider round"></span>
      </label>
      <div className="w-24 uppercase">
        <span className={isBasic ? "" : "switch-form-advanced-label-selected"}>Advanced</span>
      </div>
    </div>
  );
}
