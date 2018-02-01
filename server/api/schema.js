module.exports = `

type Tag {
    id: ID
    title: String
  }

  type User {
    id: ID
    bio: String
    email: String
    fullname: String
    shareditems: [Item]
    imageurl: String
  }

  type Item {
    id: ID
    title: String
    created: String
    itemowner: User
    borrower: User
    imageurl: String
    description: String
    available: Boolean
    tags: [Tag]
  }

  input TagInput {
    id: ID
    title: String
  }

  input AddItemInput {
    imageurl: String
    title: String
    description: String
    tags: [TagInput]
  }

  input UpdateItemInput {
    imageurl: String
    title: String
    description: String
    tags: [TagInput]
  }

  type Mutation {
    addItem(newItem: AddItemInput): Item
    updateItem(currentItem: UpdateItemInput): Item 
  }

  type Query {
    items: [Item]
    item(id: ID): Item    
    users: [User]
    user(id: ID): User
  }
`;
