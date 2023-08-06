function RadioInput({ formData, change }) {
  const { label, name, options, message } = formData;
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
        <div
          className="text-sm font-semibold leading-6 text-gray-900"
          aria-hidden="true"
        >
          {label}
        </div>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <div className="max-w-lg">
            <p className="text-sm leading-6 text-gray-600">{message}</p>
            <div className="mt-6 space-y-6">
              {options.map((option) => (
                <div className="flex items-center gap-x-3" key={option.id}>
                  <input
                    id={option.name}
                    name={name}
                    onChange={(e) => {
                      console.log(e);
                      change(e);
                    }}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor={option.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default RadioInput;
