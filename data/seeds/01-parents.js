exports.seed = async function(knex) {
  await knex("parents").insert([
    {
      parent_name: "test1",
      username: "test1",
      password: "test",
      email: "test1@test.com"
    },
    {
      parent_name: "test2",
      username: "test2",
      password: "test",
      email: "test2@test.com"
    },
    {
      parent_name: "test3",
      username: "test3",
      password: "test",
      email: "test3@test.com"
    },
    {
      parent_name: "test4",
      username: "test4",
      password: "test",
      email: "test4@test.com"
    },
    {
      parent_name: "test5",
      username: "test5",
      password: "test",
      email: "test5@test.com"
    }
  ]);
};
