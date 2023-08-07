const fs = require("node:fs/promises");
const path = require("node:path");
const cripto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const data = await readContacts();
  return data.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const data = await readContacts();
  const indexContact = data.findIndex((constact) => constact.id === contactId);
  if (indexContact === -1) {
    return null;
  }
  const newContacts = [
    ...data.slice(0, indexContact),
    ...data.slice(indexContact + 1),
  ];
  const deleteContact = await getContactById(contactId);
  await writeContacts(newContacts);
  return deleteContact;
}

async function addContact(name, email, phone) {
  const data = await readContacts();
  const newContact = { id: cripto.randomUUID(), name, email, phone };
  data.push(newContact);
  await writeContacts(data);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
