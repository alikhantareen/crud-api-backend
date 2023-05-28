const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(programmingLanguage) {
  console.log(programmingLanguage.name);
  const result = await db.query(
    `INSERT INTO programming_languages 
      (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
      VALUES 
      ('${
        programmingLanguage.name
      }', ${+programmingLanguage.releasedYear}, ${+programmingLanguage.githubRank}, ${+programmingLanguage.pyplRank}, ${+programmingLanguage.tiobeRank})`
  );

  let message = "Error in creating programming language";

  if (result.affectedRows) {
    message = {
      message: "Programming language created successfully",
      bool: true,
    };
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=${id}`
  );

  let message = "Error in deleting programming language";

  if (result.affectedRows) {
    message = "Programming language deleted successfully";
  }

  return { message };
}

async function update(id, programmingLanguage){
    console.log(programmingLanguage)
    const result = await db.query(
      `UPDATE programming_languages 
      SET name="${programmingLanguage.name}", released_year=${programmingLanguage.releasedYear}, githut_rank=${programmingLanguage.githubRank}, 
      pypl_rank=${programmingLanguage.pyplRank}, tiobe_rank=${programmingLanguage.tiobeRank} 
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language updated successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create,
  remove,
  update
};
