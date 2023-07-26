import express from 'express';
import crypto from 'crypto';
const app = express();
app.use(express.json());
// params
const todoList = [
    {
        id: crypto.randomUUID(),
        todoName: 'Làm việc nhà cho mẹ!',
        date: new Date(),
        status: 'PENDING'
    },
    {
        id: crypto.randomUUID(),
        todoName: 'Làm việc nhà cho mẹ!',
        date: new Date(),
        status: 'PENDING'
    },
    {
        id: crypto.randomUUID(),
        todoName: 'Làm việc nhà cho mẹ!',
        date: new Date(),
        status: 'PENDING'
    },
    {
        id: crypto.randomUUID(),
        todoName: 'Làm việc nhà cho mẹ!',
        date: new Date(),
        status: 'PENDING'
    },
];
app.get('/api/v1/todo-list', (req, res) => {
    try {
        const queryParams = req.query;
        const getTodoByFields = todoList.map((item) => {
            if (Object.keys(queryParams).length !== 0) {
                let mappingTodo = {};
                for (const key in item) {
                    if (Number(queryParams[key])) {
                        mappingTodo[key] = item[key];
                    } else if (Number(queryParams[key]) === 0) {
                        const getNewItem = {
                            ...item
                        };
                        for (const keyOfQuery in queryParams) {
                            delete getNewItem[keyOfQuery];
                        }
                        mappingTodo = {
                            ...getNewItem
                        }
                    }
                }
                return mappingTodo;
            } else {
                return item;
            }
        });
        res.send({
            data: getTodoByFields,
            message: 'Thành công!',
            success: true
        });
    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            success: false
        });
    }

});
app.get('/api/v1/todo-list/:id', (req, res) => {
    try {
        const { id } = req.params;
        const findRecordTodo = todoList.find((item) => {
            return item.id === id;
        });
        if (!findRecordTodo) throw new Error('Không tìm thấy!');
        res.send({
            data: findRecordTodo,
            message: 'Thành công',
            success: true
        });
    } catch (error) {
        res.send({
            data: null,
            message: error.message,
            success: false
        });
    }
});
app.post('/api/v1/todo-list', (req, res) => {
    const dataBody = req.body;
    todoList.push({
        ...dataBody,
        id: crypto.randomUUID()
    });
    res.send({
        data: todoList
    });
})
// put, delete
app.put('/api/v1/todo-list/:id', (req, res) => {
    try {
        const fieldsUpdate = req.body;
        const { id } = req.params;
        const findTodoItem = todoList.find((item) => item.id === id);
        if (!findTodoItem) throw new Error(`Không tìm thấy todo item với id: ${id}`);
        for (const key in fieldsUpdate) {
            if (findTodoItem[key] !== 'undefined') {
                findTodoItem[key] = fieldsUpdate[key];
            }
        }
        res.status(201).send({
            data: todoList,
            success: true,
            message: 'Thành công!'
        });
        
        //send, end, json
    } catch (error) {
        res.status(404).send({
            data: null,
            success: false,
            message: error.message
        });
    }
})
app.delete('/api/v1/todo-list/:id',(req,res)=>{
    /**
     * B1: tìm kiếm vị trí của phần tử todo trong mảng todoList
     * B2: kiểm tra vị trí vừa tìm được có > -1 hay không?
     * B3: xoá phần tử tại vị trí vừa tìm được (splice)
     */
})
app.listen(5001, () => {
    console.log('Server nè!');
});