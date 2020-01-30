exports.seed = async function(knex) {
  await knex("foods").insert([
    { child_id: 1, type: "fruits", servings: "2" },
    { child_id: 2, type: "veggies", servings: "3" },
    { child_id: 3, type: "snack", servings: "2" },
    { child_id: 4, type: "meat", servings: "1" },
    { child_id: 5, type: "snack", servings: "1" }
  ]);
};
