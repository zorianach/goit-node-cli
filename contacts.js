const { randomUUID } = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db/contacts.json");
console.log(contactsPath);

const writeContacts = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsAll = await listContacts();
  const contact = contactsAll.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contactsAll = await listContacts();
  const index = contactsAll.findIndex((contact) => contact.index === contactId);

  if (index === -1) {
    return null;
  }
  const removedContact = contactsAll[index];

  contactsAll.splice(index, 1);

  await writeBooks(contactsAll);

  return removedContact;
}

async function addContact(name, email, phone) {
  const contactsAll = await listContacts();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  contactsAll.push(newContact);
  await writeContacts(contactsAll);
  return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };