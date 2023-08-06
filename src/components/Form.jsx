"use client";

import FormInput from "@/components/FormInput";
import SelectSimple from "@/components/SelectSimple";
import CheckBoxInput from "@/components/CheckBoxInput";
import RadioInput from "@/components/RadioInput";
import { FormProvider, useForm } from "react-hook-form";

function Form({
  allfields,
  title,
  description,
  inputValues,
  handleChange,
  onSubmit,
}) {
  const methods = useForm();
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                {description}
              </p>
              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                {allfields.map((field) => {
                  switch (field.type) {
                    case "select":
                      return (
                        <SelectSimple
                          key={field.id}
                          formData={field}
                          selected={inputValues[field.name]}
                          change={handleChange}
                        />
                      );
                    case "checkbox":
                      return (
                        <CheckBoxInput
                          key={field.id}
                          formData={field}
                          value={inputValues[field.name]}
                          change={handleChange}
                        />
                      );
                    case "radio":
                      return (
                        <RadioInput
                          key={field.id}
                          formData={field}
                          value={inputValues[field.name]}
                          change={handleChange}
                        />
                      );
                    default:
                      return (
                        <FormInput
                          key={field.id}
                          formData={field}
                          value={inputValues[field.name]}
                          change={handleChange}
                        />
                      );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={onSubmit}
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Form;
