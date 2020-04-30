const pool = require("../config/BorrowSystemDB");

class Users {
  constructor() {
    this.users;
  }

  async getLogin(userId) {
    this.users = await pool.query(
      `SELECT userId,firstName,password FROM Users WHERE userId = '${userId}';`
    );
    return this.users;
  }

  async getUserDetails(id) {
    this.users = await pool.query(
      `SELECT u.* , CONCAT(a.firstName , " " , a.lastName) as advisorName
      FROM Users u left join Users a on a.userId = u.studentAdvisor
      WHERE u.userId = '${id}';`
    );
    return this.users;
  }

  async getUserByEmail(email) {
    this.users = await pool.query(`
      SELECT *
      FROM Users
      WHERE email = '${email}';
    `)
    return this.users;
  }
  
  async createUser(email, password) {
    this.users = await pool.query(`
      INSERT INTO Users (userId, password, email, firstName, lastName) 
      VALUES ("${email}", "${password}", "${email}", "Mr.Test", "MaringKingKong");
    `)
  }

  async changeNewPassword(userId, newPassword) {
    this.users = await pool.query(`
      UPDATE Users SET password = ${newPassword} WHERE userId = ${userId};
    `)
  }

  async getUserRole(id) {
    this.users = await pool.query(
      `select * from UserRole ur where userId = "${id}" `
    );
    return this.users;
  }
}

module.exports = Users;
