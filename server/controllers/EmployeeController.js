const Employee = require("../models/Employee");

const index = async (req, res) => {
  try {
    const employee = Employee.find();
    res.json({
      employee,
    });
  } catch (err) {
    res.json({
      message: "An error has occurred!",
    });
  }
};

const show = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    const employee = await Employee.findById(employeeID);
    res.json({
      employee,
    });
  } catch (err) {
    res.json({
      message: "An error has occurred",
    });
  }
};

const store = async (req, res) => {
  try {
    let employee = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
    });

    if (req.file) {
      employee.avatar = req.file.path;
    }
    employee = await employee.save();
    if (employee) {
      res.json({
        message: "Employee added successfully!",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: "An error has occurred!",
    });
  }
};

const update = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    let updatedData = {
      name: req.body.name,
      designation: req.body.desgination,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
    };

    await Employee.findByIdAndUpdate(employeeID, { $set: updatedData });
    res.json({
      message: "Employee updated successfully!",
    });
  } catch (err) {
    res.json({
      message: "An error has occurred!",
    });
  }
};

const remove = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    await Employee.findByIdAndRemove(employeeID);
    res.json({
      message: "Employee deleted successfully!",
    });
  } catch (err) {
    res.json({
      message: "An error has occurred!",
    });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  remove,
};
