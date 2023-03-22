const Author = require("./models/author");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const { GraphQLError } = require("graphql");
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const addAuthor = async (args) => {
  try {
    const author = new Author({ name: args.name });
    return await author.save();
  } catch (error) {
    throw new GraphQLError("Saving author failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.name,
        error,
      },
    });
  }
};

const checkLogin = (currentUser) => {
  if (!currentUser) {
    throw new GraphQLError("not authenticated", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }
  return currentUser;
};

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        return Book.find({ author: author }).populate("author");
      }
      if (args.genre)
        return Book.find({ genres: args.genre }).populate("author");
      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
  },
  // Author: {
  //   bookCount: async (root) =>
  //   Book.collection.countDocuments(),
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      checkLogin(context.currentUser);
      if (args.title == "" || args.name == "") {
        throw new GraphQLError("title and name must not be empty", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await addAuthor({ name: args.author });
      }
      const book = new Book({ ...args, author: author });
      try {
        const bk = await book.save();
        pubsub.publish("BOOK_ADDED",{bookAdded:bk});
        return bk
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      checkLogin(context.currentUser);
      let author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        return author.save();
      }
      return null;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
};

module.exports = resolvers;
