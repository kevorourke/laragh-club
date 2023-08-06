"use client";

import { useState } from "react";

import { add_member_fields } from "@/lib/form_data";
import { useSupabase, useSession } from "@/supabase/SupabaseProvider";
import Form from "@/components/Form";

function Page() {
  const allfields = add_member_fields;
  const supabase = useSupabase();
  const session = useSession();

  // const onSubmit = methods.handleSubmit((data) => {
  //   console.log(data);
  // });

  const onSubmit = async () => {
    const { error } = await supabase
      .from("members")
      .insert({ ...inputValues, user_id: session.user.id });
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
    <Form
      allfields={allfields}
      title={"Create new team"}
      description={"Please fill out all the details below"}
      inputValues={inputValues}
      handleChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}

export default Page;
