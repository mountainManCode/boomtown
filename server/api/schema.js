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
    numborrowed: String
  }

  type Item {
    id: ID
    title: String
    itemowner: User
    borrower: User
    created: String    
    imageurl: String
    description: String
    available: Boolean
    tags: [Tag]
  }

  input TagInput {
    id: ID
  }

  input AddUserAuthInput {
    email: String
    password: String
  }

  input AddItemInput {
    title: String
    description: String
    imageurl: String
    itemowner: ID
    tags: [TagInput]
  }

  input UpdateItemInput {
    imageurl: String
    title: String
    description: String
    tags: [TagInput]
  }

  type Mutation {
    createNewUserAuth(newUser: AddUserAuthInput): User
    createNewItem(newItem: AddItemInput): Item
    updateItem(currentItem: UpdateItemInput): Item 
  }

  type Query{
    items: [Item]
    users: [User]
    tags: [Tag]
    user(id: ID): User
    item(id: ID): Item
    tag(id: ID): Tag
  }
`;
