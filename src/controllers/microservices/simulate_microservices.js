const User = require("models/sqlserver/User");
const Address = require("models/sqlserver/Address");
const Company = require("models/sqlserver/Company");
const Fakerator = require("fakerator");
const gerarCPF = require("gerar-cpf");
const bcrypt = require("bcrypt");

const { sqlserver } = require("database/database.js");

const { getChoice } = require("../../utils/choice");
const { fillArray } = require("../../utils/array");

const simulate = async (params) => {
  const { nrows } = params;
  const created_ids = await createUser(nrows);
  for (created_id of created_ids) {
    createAddress(created_id);
    createCompany(created_id);
  }
};

const createUser = async (nrows = 1) => {
  const languages = [
    ...fillArray("en-US", 87),
    "cs-CZ",
    "de-DE",
    "en-AU",
    "en-CA",
    "es-ES",
    "fr-FR",
    "hu-HU",
    "it-IT",
    "nb-NO",
    "pl-PL",
    "ru-RU",
    "sk-SK",
    "sv-SE",
  ];

  const users = [];

  for (let i = 0; i < nrows; i++) {
    const languageChoice = getChoice(languages);
    console.log(`Choose ${languageChoice} language`);

    let fakerator;
    if (languageChoice == "en-US") {
      fakerator = Fakerator();
    } else {
      fakerator = Fakerator(languageChoice);
    }

    const genderChoice = getChoice(["M", "F"]);
    console.log(`Choose ${genderChoice} gender`);

    const ipChoice = getChoice(["ipv4", "ipv6"]);

    const firstName = genderChoice == "M"
      ? fakerator.names.firstNameM()
      : fakerator.names.firstNameF();
    const lastName = genderChoice == "M"
      ? fakerator.names.lastNameM()
      : fakerator.names.lastNameF();

    const user = {
      cpf: gerarCPF("xxx.xxx.xxx-xx"),
      name: `${firstName} ${lastName}`,
      gender: genderChoice,
      email: fakerator.internet.email(firstName, lastName),
      birth_date: fakerator.date
        .past(100, new Date())
        .toISOString()
        .slice(0, 10),
    };

    users.push(user);
  }

  const results = await User.bulkCreate(users);
  const creted_ids = results.map((user) => user.dataValues.id);

  return creted_ids;
};

const updateAddress = async () => {
  const [results, metadata] = await sqlserver.query(
    "SELECT TOP 1 id FROM register.dbo.users ORDER BY NEWID()",
  );
  console.log(metadata);
  console.log(results);
  return true;
};

const createAddress = async (user_id) => {
  const fakerator = Fakerator();
  const { country, countryCode, state, city, street, zip, geo } = fakerator
    .entity.address();
  const { latitude, longitude } = geo;
  const { dataValues } = await Address.create({
    user_id,
    country,
    countryCode,
    state,
    city,
    street,
    zipcode: zip,
    latitude,
    longitude,
  });

  return dataValues;
};

const createCompany = async (user_id) => {
  const user = await User.findByPk(user_id);

  const fakerator = Fakerator();
  const { name, email, phone, website } = fakerator.entity.company();

  const [company] = await Company.findOrCreate({
    where: { name, email, phone, website },
  });

  const { dataValues } = user.addCompany(company);

  return { dataValues, company };
};

module.exports = {
  simulate,
};
