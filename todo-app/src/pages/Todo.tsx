import React, {ReactElement, FC, useState, useEffect, useCallback} from "react";
import { Button, Card, Form } from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import {addNewTodoApi, deleteTodoApi, getTodosApi} from "../api/requests";


function FormTodo({ addTodo }: any) {
    const [value, setValue] = React.useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label><b>Add Todo</b></Form.Label>
                <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
                Submit
            </Button>
        </Form>
    );
}

function TodoItem({ todo, index, removeTodo }: any) {
    return (
        <div
            className="todo"
        >
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.name}</span>
            <div>
                <Button variant="outline-danger" onClick={() => removeTodo(index, todo)}>✕</Button>
            </div>
        </div>
    );
}

const Todo: FC<any> = (props): ReactElement => {
    const {state} = useLocation();
    const { token} = state; // Read values passed on state


    const [todos, setTodos] = useState([

    ]);

    const getTodos = useCallback(async () => {
        const resp = await getTodosApi(token)
        const newTodos: any = resp;
        setTodos(newTodos);
        }, [])

    useEffect( () => {
        getTodos()
    }, [getTodos])

    const addTodo = async (text: string) => {
       const resp: any =  await addNewTodoApi(token, text)
        const newTodos: any = [...todos, {...resp}];
        setTodos(newTodos);
    };

    const removeTodo =async (index: number, todo: any) => {
        console.log(todo)
         await deleteTodoApi(token, todo.id)
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4">Todo List</h1>
                <FormTodo addTodo={addTodo} />
                <div>
                    {todos.map((todo, index) => (
                        <Card>
                            <Card.Body>
                                <TodoItem
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    removeTodo={removeTodo}
                                />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>    );
};

export default Todo;
