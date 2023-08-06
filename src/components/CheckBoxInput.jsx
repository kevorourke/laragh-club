function CheckBoxInput({ formData, change }) {
  const { label, options } = formData;

  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
        <div
          className="text-sm font-semibold leading-6 text-gray-900"
          aria-hidden="true"
        >
          {label}
        </div>
        <div className="mt-4 sm:col-span-2 sm:mt-0">
          <div className="max-w-lg space-y-6">
            {options.map((option) => (
              <div className="relative flex gap-x-3" key={option.id}>
                <div className="flex h-6 items-center">
                  <input
                    id={option.name}
                    name={option.name}
                    onClick={(e) => {
                      console.log(e);
                      change(e);
                    }}
                    data-parent={option.parent}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor={option.name}
                    className="font-medium text-gray-900"
                  >
                    {option.label}
                  </label>
                  <p className="mt-1 text-gray-600">{option.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default CheckBoxInput;
