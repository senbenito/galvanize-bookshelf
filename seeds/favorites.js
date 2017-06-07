
exports.seed = function(knex, Promise) {

let data =
[{
  id: 1,
  book_id: 1,
  user_id: 1,
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
}];

//   // Deletes ALL existing entries
//   return knex('favorites').del()
//     .then(function () {
//       return knex('favorites').insert(data);});
// };


// Deletes ALL existing entries
return knex('favorites').del()
  .then(function () {
    return knex('favorites').insert(data);})
  .then(function () {
    return knex.raw("SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites))");
  });
};
