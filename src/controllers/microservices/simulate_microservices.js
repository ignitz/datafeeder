const Person = require("models/sqlserver/Person");
const Address = require("models/sqlserver/Address");
const Company = require("models/sqlserver/Company");
const User = require("models/postgres/User");
const Post = require("models/postgres/Post");
const Fakerator = require("fakerator");
const gerarCPF = require("gerar-cpf");
const bcrypt = require("bcrypt");

const { sqlserver } = require("database/database.js");
const { postgres } = require("database/database.js");

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
      updateAvatar(nrows);
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
            updateAvatar(1);
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
  const { new_persons, new_users } = await createPerson(nrows);
  const created_ids = new_persons.map((person) => person.dataValues.id);
  const created_user_ids = new_users.map((user) => user.dataValues.id);

  for (created_id of created_ids) {
    await createAddress(created_id);
    await createCompany(created_id);
  }

  for (user_id of created_user_ids) {
    await createPosts(user_id);
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

    const firstName =
      genderChoice == "M"
        ? fakerator.names.firstNameM()
        : fakerator.names.firstNameF();
    const lastName =
      genderChoice == "M"
        ? fakerator.names.lastNameM()
        : fakerator.names.lastNameF();

    const email = fakerator.internet.email(firstName, lastName);

    const cpf = gerarCPF("xxx.xxx.xxx-xx");

    const new_person = {
      cpf,
      name: `${firstName} ${lastName}`,
      gender: genderChoice,
      email: email,
      birth_date: fakerator.date
        .past(100, new Date())
        .toISOString()
        .slice(0, 10),
    };

    const username = fakerator.internet.userName(firstName, lastName);
    const password = bcrypt.hashSync(fakerator.random.string(10), 10);
    const avatar = fakerator.internet.avatar();

    const new_user = {
      cpf: cpf.replace("-", "").split(".").join(""),
      email,
      username,
      password,
      avatar,
    };

    persons.push(new_person);
    users.push(new_user);
  }

  const new_persons = await Person.bulkCreate(persons);

  const new_users = await User.bulkCreate(users);

  return { new_persons, new_users };
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

const createPosts = async (user_id) => {
  fakerator = Fakerator();
  // const numberOfPosts = fakerator.random.number(30);
  const numberOfPosts = 1;
  const posts = [];

  for (let i = 0; i < numberOfPosts; i++) {
    const ipChoice = getChoice(["ipv4", "ipv6"]);
    let ip;

    if (ipChoice == "ipv4") {
      ip = fakerator.internet.ip();
    } else if (ipChoice == "ipv6") {
      ip = fakerator.internet.ipv6();
    }

    const mac = fakerator.internet.mac();

    const post = {
      ...fakerator.entity.post(),
      ip,
      mac,
      user_id,
    };
    post.keywords = post.keywords.toString();
    posts.push(post);
  }

  const new_posts = await Post.bulkCreate(posts);

  return new_posts;
};

const updateAvatar = async (nrows = 1) => {
  const fakerator = Fakerator();

  const [ids, metadata] = await postgres.query(
    `SELECT id FROM tracker.public.users ORDER BY RANDOM() LIMIT ${nrows}`
  );

  for (const row of ids) {
    const { id } = row;

    const user = await User.findByPk(id);

    const avatar = fakerator.internet.avatar();
    const result = await user.update({
      avatar,
    });

    console.log("Updated user row to: ", result);

    await user.save();
  }

  return true;
};

module.exports = {
  simulate,
};
