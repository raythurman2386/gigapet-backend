const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const { Food } = require('../models/Model')

// Construct a schema
const schema = buildSchema(`
  type Query {
    food(id: Int!): Food,
    foods: [Food],
  }
  type Mutation {
    createFood(name: String!, child_id: Int!, type: String!, servings: Int!): Food,
    deleteFood(id: Int!): DeleteFoodResponse
  }
  input FoodInput {
    name: String!,
    child_id: Int,
    type: String!,
    servings: String!
  }
  type DeleteFoodResponse {
    id: Int!
  }
  type Food {
    id: Int!,
    name: String!,
    created_at: String,
    child_id: Int,
    type: String!,
    servings: Int!
  }
`)

const foodResolver = {
  food: graphqlInput => Food.findBy(graphqlInput),
  foods: Food.find(),
  createFood: graphqlInput => Food.add(graphqlInput),
  deleteFood: graphqlInput => Food.remove(graphqlInput.id)
}

const graphql = graphqlHTTP({
  schema,
  rootValue: foodResolver,
  graphiql: true,
})

module.exports = graphql