import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {  ALL_BOOKS_BY_GENRE, MY_DETAILS } from "../queries";

const Recommendation = (props) => {
  const [genre, setGenre] = useState(null);
  const books = useQuery(ALL_BOOKS_BY_GENRE, { variables: {  genre } ,skip:!genre},);
  const me = useQuery(MY_DETAILS)
  useEffect(()=>{
    if(me.data) {
      setGenre(me.data.me.favoriteGenre)}

  },[me.data])
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
    </div>
  );
};

export default Recommendation;
