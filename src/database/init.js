const Person = require("../models/sqlserver/Person");
const Address = require("../models/sqlserver/Address");
const Company = require("../models/sqlserver/Company");
const User = require("../models/postgres/User");
const Post = require("../models/postgres/Post");

const { sqlserver, postgres } = require("./database");

Person.init(sqlserver);
Address.init(sqlserver);
Company.init(sqlserver);
User.init(postgres);
Post.init(postgres);

Person.associate(sqlserver.models);
Address.associate(sqlserver.models);
Company.associate(sqlserver.models);
User.associate(postgres.models);
Post.associate(postgres.models);
