const User = require("models/User");
const Fakerator = require("fakerator");
const gerarCPF = require("gerar-cpf");
const bcrypt = require("bcrypt");

const getChoice = (choiceList) => {
  const idx = Math.floor(Math.random() * choiceList.length);
  return choiceList[idx];
};

function fillArray(value, len) {
  if (len == 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}

module.exports = {
  async example(req, res) {
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
      birthDate: fakerator.date
        .past(100, new Date())
        .toISOString()
        .slice(0, 10),
      nationality: languageChoice.slice(3),
      address: fakerator.entity.address(),
      phone: fakerator.phone.number(),
      company: fakerator.company.name(),
      internet: {
        username: fakerator.internet.userName(firstName, lastName),
        password: bcrypt.hashSync(
          fakerator.internet.password(fakerator.random.number(8, 15)),
          10
        ),
        internetDomain: fakerator.internet.domain(),
        url: fakerator.internet.url(),
        email: fakerator.internet.email(firstName, lastName),
        avatar: fakerator.internet.avatar(),
        macAddress: fakerator.internet.mac(),
        sourceIP:
          ipChoice == "ipv4"
            ? fakerator.internet.ip()
            : fakerator.internet.ipv6(),
      },
    };

    res.json({ user });
  },
  async store(req, res) {
    const { cpf, name, email } = req.body;

    const user = await User.create({
      cpf,
      name,
      email,
    });

    return res.json(user);
  },
};
