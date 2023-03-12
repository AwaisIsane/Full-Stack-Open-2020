import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_YEAR } from "../queries";

const EditBirth = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [setYear] = useMutation(UPDATE_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
        const errors = error.graphQLErrors[0].message
        alert(errors)
      }
  });
  const submit = (event) => {
    event.preventDefault();

    setYear({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
  };
  return (
    <>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value=""  disabled hidden>Select an Author</option>
            {props.authors.map(author=><option value={author.name} key={author.id} >{author.name}</option>)}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default EditBirth;
