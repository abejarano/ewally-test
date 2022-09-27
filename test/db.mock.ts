export default () => {
  return [
    {
      name: "angel",
      cpf: "123321222",
      friends: [
        {
          name: "jose",
          cpf: "123321220",
        },
        {
          name: "jesus",
          cpf: "123321210",
        },
        {
          name: "antonio",
          cpf: "223321210",
        },
      ],
    },
    {
      name: "jose",
      cpf: "123321220",
      friends: [],
    },
    {
      name: "jesus",
      cpf: "123321220",
      friends: [
        {
          name: "nombreMari",
          cpf: "45632122",
        },
        {
          name: "antonio",
          cpf: "223321210",
        },
      ],
    },
    {
      name: "nombreMari",
      cpf: "45632122",
      friends: [],
    },
  ];
};
