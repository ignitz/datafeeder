const Person = require("../models/sqlserver/Person");
const Address = require("../models/sqlserver/Address");
const Company = require("../models/sqlserver/Company");

const { sqlserver } = require("./database");

Person.init(sqlserver);
Address.init(sqlserver);
Company.init(sqlserver);

Person.associate(sqlserver.models);
Address.associate(sqlserver.models);
Company.associate(sqlserver.models);
