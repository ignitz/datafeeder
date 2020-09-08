const User = require("../models/sqlserver/User");
const Address = require("../models/sqlserver/Address");
const Company = require("../models/sqlserver/Company");

const { sqlserver } = require("./database");

User.init(sqlserver);
Address.init(sqlserver);
Company.init(sqlserver);

User.associate(sqlserver.models);
Address.associate(sqlserver.models);
Company.associate(sqlserver.models);
