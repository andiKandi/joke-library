import React, { ChangeEvent, useState } from "react";
import { Input } from "../../components/Input";
import { Button, DangerButton } from "../../components/Button";
import { Joke } from "./JokeList";
import { Textarea } from "../../components/Textarea";
import { SfwButton } from "./SfwButton";
import { NsfwButton } from "./NsfwButton";

interface EditJokeFormState {
  name: string;
  description: string;
  category: string;
  counter: number;
  show: boolean;
  language: string;
}

export const EditForm: React.FC<{ afterSubmit: () => void; joke: Joke }> = ({
  afterSubmit,
  joke,
}) => {
  const [values, setValues] = useState<EditJokeFormState>(joke);
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.name.length < 3) {
      alert("Name too short. Min. == 3");
      return;
    }
    if (values.description.length < 10) {
      alert("Description too short. Min. == 10");
      return;
    }

    await fetch(`/api/joke/${joke.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    afterSubmit();
  };

  const fieldDidChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const deleteJoke = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/joke/${joke.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    afterSubmit();
  };

  const handleAreaHeight = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  const changeShow = () => {
    setValues({ ...values, show: !values.show });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name="name"
        type="text"
        label="Name"
        onChange={fieldDidChange}
        required
        value={values.name}
      />
      <Textarea
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.description}
        onClick={handleAreaHeight}
        onKeyPress={handleAreaHeight}
      />
      <Input
        name="category"
        label="Category"
        type="text"
        onChange={fieldDidChange}
        required
        value={values.category}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <Input
          style={{ marginBottom: "0px" }}
          name="language"
          label="Language"
          type="text"
          onChange={fieldDidChange}
          required
          value={values.language}
        />
        <Input
          style={{ marginBottom: "0px" }}
          name="counter"
          label="Likes"
          type="number"
          onChange={fieldDidChange}
          required
          value={values.counter}
        />
        {values.show ? (
          <SfwButton
            style={{
              borderRadius: "5px",
              height: "72px",
              margin: "0",
            }}
            onClick={changeShow}
          />
        ) : (
          <NsfwButton
            style={{
              borderRadius: "5px",
              height: "72px",
              margin: "0",
            }}
            onClick={changeShow}
          />
        )}
      </div>

      <Button type="submit">Edit Joke</Button>
      <DangerButton onClick={deleteJoke}>Delete Joke</DangerButton>
    </form>
  );
};
