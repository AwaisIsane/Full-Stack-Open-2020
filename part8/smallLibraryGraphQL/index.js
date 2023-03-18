const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { mongoose } = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

/*
  you can remove the placeholder query once your first own has been implemented 
*/

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

const typeDefs = `#graphql

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }


  type Author {
    name: String!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount : Int!
    authorCount :Int!
    allBooks(author:String,genre:String) : [Book!]!
    allAuthors : [Author]
    me: User
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]

    ):Book

    editAuthor (
      name: String!
      setBornTo: Int!
    ):Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

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
    addBook: async (root, args,context) => {
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
        return await book.save();
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
    editAuthor: async (root, args,context) => {
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.SECRET
      );
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
