"use client";
import { create_team_fields } from "@/lib/form_data";
import { useSupabase, useSession } from "@/supabase/SupabaseProvider";
import Form from "@/components/Form";
import { useState } from "react";

function Page() {
  const allfields = create_team_fields;

  const supabase = useSupabase();
  const session = useSession();

  // const onSubmit = methods.handleSubmit((data) => {
  //   console.log(data);
  // });

  const onSubmit = async () => {
    const { error } = await supabase
      .from("teams")
      .insert({ ...inputValues, user_id: session.user.id });
  };

  const generateInitialState = (data) => {
    let initialObj = {};
    data.forEach((item) => (initialObj = { ...initialObj, [item.name]: null }));
    initialObj = { ...initialObj, year: [], country: "Ireland" };
    return initialObj;
  };

  const initialState = generateInitialState(allfields);
  const [inputValues, setInputValues] = useState(initialState);

  const handleChange = ({ target }) => {
    let value = null;
    let key = target.id;

    if (target.type === "checkbox") {
      const parent = target.dataset.parent;
      if (target.checked) {
        const newArr = inputValues[parent].push(key);
        setInputValues({
          ...inputValues,
          [parent]: newArr,
        });
      }

      return;
      // value = target.checked;
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
  return (
    <Form
      allfields={allfields}
      title={"Add new member"}
      description={"Please fill out all the details below"}
      inputValues={inputValues}
      handleChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}

export default Page;
