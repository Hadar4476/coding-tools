class Users {
  usersArr = ["hadar", "amir", "yossi", "vidran"];

  getUsers() {
    return this.usersArr;
  }

  getUsersAmount() {
    return this.usersArr.length;
  }
}

module.exports = Users;
