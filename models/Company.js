const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: String,
    password: String,
    image: {
      type: String,
    },
    comfirmed: Boolean,
    employees: [{ type: ObjectId, ref: "user" }],
    score: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;