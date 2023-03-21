import { useQuery } from "@apollo/client";
import { useState } from "react";
import {  ALL_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("children");
  const books = useQuery(ALL_BOOKS_BY_GENRE, { variables: { genre: genre } });
  const genres = ["economics","fantasy","children","adventure","romance","sports"];
  if (!props.show) {
    return null;
  }

  if (books.loading) <>loading ....</>;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>{books.data?
          books.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )):<tr><td colSpan={3}>no books to show</td></tr>}
        </tbody>
      </table>
      {genres.map((g)=><button key={g} onClick={()=>setGenre(g)}>{g}</button>)}
    </div>
  );
};

export default Books;
