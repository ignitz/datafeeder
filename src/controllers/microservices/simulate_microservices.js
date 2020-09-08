const User = require("models/sqlserver/User");
const Fakerator = require("fakerator");
const gerarCPF = require("gerar-cpf");
const bcrypt = require("bcrypt");

const { sqlserver } = require("database/database.js");

const { getChoice } = require("../../utils/choice");
const { fillArray } = require("../../utils/array");

const simulate = async (params) => {
  const { nrows } = params;
  await createUser(nrows);
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

    const firstName =
      genderChoice == "M"
        ? fakerator.names.firstNameM()
        : fakerator.names.firstNameF();
    const lastName =
      genderChoice == "M"
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
  console.log(results.map((user) => user.dataValues.id));

  // await createAddress();

  return true;
};

const createAddress = async () => {
  const [results, metadata] = await sqlserver.query(
    "SELECT TOP 1 id FROM register.dbo.users ORDER BY NEWID()"
  );
  console.log(metadata);
  console.log(results);
  return true;
};

module.exports = {
  simulate,
};
