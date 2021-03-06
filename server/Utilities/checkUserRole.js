const checkUserRole = (role) => {
  const userRole = { department: false, staff: false, admin: false, student: false }
  for (let i = 0; i < role.length; i++) {
    if (role[i].roleId === 10) {
      userRole.student = true
    }
    if (role[i].roleId === 20) {
      userRole.staff = true
    }
    if (role[i].roleId === 99) {
      userRole.admin = true
    }
  }

  let roleArray = [];
  for (let i = 0; i < role.length; i++) {
    roleArray.push(role[i].roleId);
  }
  let departmentlist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let isDepartment = roleArray.every(element => departmentlist.indexOf(element) > -1);
  userRole.department = isDepartment
  return userRole
}

module.exports = { checkUserRole }