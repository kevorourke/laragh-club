"use client";

import { useState } from "react";
import FormInput from "@/components/FormInput";
import SelectSimple from "@/components/SelectSimple";
import CheckBoxInput from "@/components/CheckBoxInput";
import RadioInput from "@/components/RadioInput";
import { add_member_fields } from "@/lib/form_data";
import { FormProvider, useForm } from "react-hook-form";
import { useSupabase, useSession } from "@/supabase/SupabaseProvider";

function Page() {
  const allfields = add_member_fields;
  const methods = useForm();
  const supabase = useSupabase();
  const session = useSession();

  // const onSubmit = methods.handleSubmit((data) => {
  //   console.log(data);
  // });

  const onSubmit = async () => {
    const { error } = await supabase
      .from("members")
      .insert({ ...inputValues, user_id: session.user.id });
    console.log(error);
  };

  const generateInitialState = (data) => {
    let initialObj = {};
    data.forEach(
      (item) => (initialObj = { ...initialObj, [item.field_name]: null })
    );
    initialObj = { ...initialObj, county: "Antrim", country: "Ireland" };
    return initialObj;
  };

  const initialState = generateInitialState(allfields);
  const [inputValues, setInputValues] = useState(initialState);

  const handleChange = ({ target }) => {
    let value = null;
    let key = target.id;
    if (target.type === "checkbox") {
      value = target.checked;
    } else if (target.type === "radio") {
      key = target.name;
      value = target.id;
    } else {
      value = target.value;
    }

    setInputValues({
      ...inputValues,
      [key]: value,
    });
  };

  // const output = allfields.map(field =>

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                {allfields.map((field) => {
                  switch (field.field_type) {
                    case "select":
                      return (
                        <SelectSimple
                          key={field.id}
                          formData={field}
                          selected={inputValues[field.field_name]}
                          change={handleChange}
                        />
                      );
                    case "checkbox":
                      return (
                        <CheckBoxInput
                          key={field.id}
                          formData={field}
                          value={inputValues[field.field_name]}
                          change={handleChange}
                        />
                      );
                    case "radio":
                      return (
                        <RadioInput
                          key={field.id}
                          formData={field}
                          value={inputValues[field.field_name]}
                          change={handleChange}
                        />
                      );
                    default:
                      return (
                        <FormInput
                          key={field.id}
                          formData={field}
                          value={inputValues[field.field_name]}
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
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Page;
