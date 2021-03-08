const user = [

    {
        id: 1,
        name: "adan",
        surname: "sanchez"

    },
    {
        id: 2,
        name: "antonela",
        surname: "sanchez"

    }

]

const newUser = {

    id: 3,
    name: "yoyis",

}

user.push(newUser);

const updateUser = user.find(u => {
    if (u.id === 1) {

        u.name = 'wero'
    }
});


user.filter((u, i) => {
    if (u.id === 2) {

        user.splice(i, 1);
    }
});

console.log(user)

// console.log(updateUser);

// console.log(user);