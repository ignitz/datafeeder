const Person = require("models/sqlserver/Person");
const Address = require("models/sqlserver/Address");
const Company = require("models/sqlserver/Company");
const Fakerator = require("fakerator");
const gerarCPF = require("gerar-cpf");
const bcrypt = require("bcrypt");

const { sqlserver } = require("database/database.js");

const { getChoice } = require("../../utils/choice");
const { fillArray } = require("../../utils/array");

const simulate = async (params) => {
  const { nrows, op } = params;
  if (isNaN(nrows)) throw new Error("Param nrows is not a number");
  switch (op) {
    case "create":
      createRecords(nrows);
      break;
    case "update":
      updateAddress(nrows);
      break;
    case "delete":
      // TODO Delete
      break;
    default:
      // Default is random

      for (let i = 0; i < nrows; i++) {
        const choice = getChoice([
          ...fillArray("create", 10),
          ...fillArray("update", 5),
          ...fillArray("delete", 0),
        ]);
        switch (choice) {
          case "create":
            createRecords(1);
            break;
          case "update":
            updateAddress(1);
            break;
          case "delete":
            // TODO Delete
            break;
          default:
            throw new Error(`Choice ${choice} not implemented yet!`);
        }
      }
      break;
  }
};

const createRecords = async (nrows = 1) => {
  const created_ids = await createPerson(nrows);
  for (created_id of created_ids) {
    createAddress(created_id);
    createCompany(created_id);
  }
  return true;
};

const createPerson = async (nrows = 1) => {
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

  const persons = [];

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

    const firstName =
      genderChoice == "M"
        ? fakerator.names.firstNameM()
        : fakerator.names.firstNameF();
    const lastName =
      genderChoice == "M"
        ? fakerator.names.lastNameM()
        : fakerator.names.lastNameF();

    const person = {
      cpf: gerarCPF("xxx.xxx.xxx-xx"),
      name: `${firstName} ${lastName}`,
      gender: genderChoice,
      email: fakerator.internet.email(firstName, lastName),
      birth_date: fakerator.date
        .past(100, new Date())
        .toISOString()
        .slice(0, 10),
    };

    persons.push(person);
  }

  const results = await Person.bulkCreate(persons);
  const creted_ids = results.map((person) => person.dataValues.id);

  return creted_ids;
};

const updateAddress = async (nrows = 1) => {
  const fakerator = Fakerator();

  const [ids, metadata] = await sqlserver.query(
    `SELECT TOP ${nrows} id FROM register.dbo.addresses ORDER BY NEWID()`
  );
  for (const row of ids) {
    const { id } = row;
    const address = await Address.findByPk(id);

    const {
      country,
      countryCode,
      state,
      city,
      street,
      zip,
      geo,
    } = fakerator.entity.address();
    const { latitude, longitude } = geo;

    const result = await address.update({
      country,
      countryCode,
      state,
      city,
      street,
      zip,
      geo,
      latitude,
      longitude,
    });

    console.log("Updated address row to: ", result);

    await address.save();
  }
  return true;
};

const createAddress = async (person_id) => {
  const fakerator = Fakerator();
  const {
    country,
    countryCode,
    state,
    city,
    street,
    zip,
    geo,
  } = fakerator.entity.address();
  const { latitude, longitude } = geo;
  const { dataValues } = await Address.create({
    person_id,
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

const createCompany = async (person_id) => {
  const person = await Person.findByPk(person_id);

  const fakerator = Fakerator();
  const { name, email, phone, website } = fakerator.entity.company();

  const [company] = await Company.findOrCreate({
    where: { name, email, phone, website },
  });

  const { dataValues } = person.addCompany(company);

  return { dataValues, company };
};

module.exports = {
  simulate,
};
