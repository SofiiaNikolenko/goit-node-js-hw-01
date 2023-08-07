const contact = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listResult = await contact.listContacts();
      return console.table(listResult);

    case "get":
      const getResult = await contact.getContactById(id);
      return console.log(getResult);

    case "add":
      const addResult = await contact.addContact(name, email, phone);
      return console.log(addResult);

    case "remove":
      const removeResult = await contact.removeContact(id);
      return console.log(removeResult);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
