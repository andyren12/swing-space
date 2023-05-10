const Employee = require("../models/Employee");

const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error has occurred!",
      });
    });
};

const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error has occurred!",
      });
    });
};

const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });

  if (req.file) {
    employee.avatar = req.file.path;
  }
  employee
    .save()
    .then((response) => {
      res.json({
        message: "Employee added successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error hass occurred!",
      });
    });
};

const update = (req, res, next) => {
  let employeeID = req.body.employeeID;
  let updatedData = {
    name: req.body.name,
    designation: req.body.desgination,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Employee updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error has occurred!",
      });
    });
};

const remove = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: "Employee deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error has occurred!",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  remove,
};
