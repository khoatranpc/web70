import express from 'express';
const app = express();

const todoList = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        todoName: "Làm gì đó 1",
        date: "24/07/2023",
        status: "PENDING",
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        todoName: "Làm gì đó 2",
        date: "23/07/2023",
        status: "TODO",
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        todoName: "Làm gì đó 3",
        date: "22/07/2023",
        status: "DOING",
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        todoName: "Làm gì đó 4",
        date: "21/07/2023",
        status: "DONE",
    },
];
app.get('/api/todo-list', (req, res) => {
    const queryParams = req.query;
    const getDataConfig = todoList.map((item) => {
        let getItem = {};
        if (Object.keys(queryParams).length !== 0) {
            for (const key in queryParams) {
                if (Number(queryParams[key]) && item[key]) {
                    getItem[key] = item[key];
                } else if (Number(queryParams[key]) === 0) {
                    const tempItem = {
                        ...item
                    };
                    for (const getKeyQuery in queryParams) {
                        delete tempItem[getKeyQuery];
                    }
                    getItem = {
                        ...tempItem
                    }
                } else {
                    getItem = {
                        ...item
                    }
                }
            }
            return getItem;
        }
        else return item;
    });
    res.send({ getDataConfig })
});
app.listen(5001, () => {
    console.log(`Server is running!`);
});