const FormControls = ({ formControls = [], formData, setFormData }) => {
  function renderCompbyType() {}

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controleItem, index) => (
        <div key={index}>

        </div>
      ))}
    </div>
  );
};

export default FormControls;
