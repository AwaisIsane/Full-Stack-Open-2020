const Author = require("./models/author");
const Book = require("./models/book");
const DataLoader = require("dataloader");
const bookCountLoader = new DataLoader((authorIds) => {
  return Book.find({ author: { $in: authorIds } }).then((books) => {
    return authorIds.map((ath) =>
      books.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue.author.equals(ath) ? 1 : 0),
        0
      )
    );
  });
});

const loaders = { bookCountLoader };

module.exports = loaders;
