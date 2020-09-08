const User = require("../models/sqlserver/User");
const Address = require("../models/sqlserver/Address");

const { sqlserver } = require("./database");

User.init(sqlserver);
Address.init(sqlserver);

User.associate(sqlserver.models);
Address.associate(sqlserver.models);
