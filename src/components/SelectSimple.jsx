"use clien";

function SelectInput({ formData, change, selected }) {
  const {
    label,
    name,
    type,

    options,
    placeholder,
  } = formData;

  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
      >
        {label}
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <select
          id={name}
          name={name}
          autoComplete="country-name"
          placeholder={placeholder}
          onChange={(e) => change(e)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {options.map((value) => (
            <option key={value.id}>{value.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectInput;
