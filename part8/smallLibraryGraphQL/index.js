const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { mongoose } = require("mongoose");
const author = require("./models/author");
require("dotenv").config();
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

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

const addAuthor = async (args) =>  {
  try {
    const  author = new Author({name:args.name});
     return await author.save()
  }
  catch (error) {
    throw new GraphQLError('Saving author failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args.name,
        error
      }
    })
  }
}

const typeDefs = `#graphql

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
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({name:args.author})
        if (!author) return []
        return Book.find({author: author}).populate("author")
      }
      if (args.genre)
        return Book.find({genres:args.genre}).populate('author');
      return Book.find({}).populate('author');
    },
    allAuthors: async () => Author.find({}),
  },
  // Author: {
  //   bookCount: async (root) =>
  //   Book.collection.countDocuments(),
  // },
  Mutation: {
    addBook: async (root, args) => {
      if (args.title == "" || args.name == "") {
        throw new GraphQLError("title and name must not be empty", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
      let author  = await Author.findOne({ name: args.author });
      if (!author) {
         author = await addAuthor({ name: args.author });
      }
      const book = new Book({ ...args,author:author });
      try {
      return  await book.save();
      }
      catch(error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo ;
        return author.save();
      }
      return null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
