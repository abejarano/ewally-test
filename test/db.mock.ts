import { PersonType } from "../src/Domain/PersonType";

export const personWithFriends = {
  name: "Angel",
  cpf: "123.321.222-77",
  friends: [
    {
      name: "Jose",
      cpf: "123.321.210-11",
    },
    {
      name: "Jesus",
      cpf: "123.321.210-33",
    },
    {
      name: "Antonio",
      cpf: "112.233.212-10",
    },
  ],
} as PersonType;

export const personWithFriendsOfJesus = {
  name: "Jesus",
  cpf: "123.321.210-33",
  friends: [
    {
      name: "Mari",
      cpf: "224.563.212-22",
    },
    {
      name: "Jose",
      cpf: "123.321.210-11",
    },
    {
      name: "Antonio",
      cpf: "112.233.212-10",
    },
    {
      name: "Mateus",
      cpf: "012.233.212-19",
    },
    {
      name: "Lucas",
      cpf: "612.239.212-19",
    },
  ],
};

export const personWithFriendsOfMari = {
  name: "Mari",
  cpf: "224.563.212-22",
  friends: [
    {
      name: "Antonio",
      cpf: "112.233.212-10",
    },
    {
      name: "Lulu",
      cpf: "012.233.212-19",
    },
    {
      name: "Armando",
      cpf: "612.239.212-19",
    },
    {
      name: "Jose",
      cpf: "123.321.210-11",
    },
  ],
};
