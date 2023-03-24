import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS_BY_GENRE, BOOK_ADDED } from "../queries";

export const updateCache = (cache, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.id;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  addedBook.genres.forEach((ele) => {
    cache.updateQuery({ query: ALL_BOOKS_BY_GENRE, variables: { genre: ele } }, (data) => {
      if (data.allBooks) {
        console.log("data",ele)
        return {
          allBooks: uniqByName(data.allBooks.concat(addedBook)),
        };
      }
    });
  });
};
const Books = (props) => {
  const [genre, setGenre] = useState("children");
  const books = useQuery(ALL_BOOKS_BY_GENRE, { variables: { genre: genre } });
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      alert(`book added${data}`);
      console.log(data);
      updateCache(client.cache,data.data.bookAdded)
    },
  });
  const genres = [
    "economics",
    "fantasy",
    "children",
    "adventure",
    "romance",
    "sports",
  ];
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
          </tr>
          {books.data ? (
            books.data.allBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no books to show</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
