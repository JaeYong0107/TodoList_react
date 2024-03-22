export async function getTodoData() {
    const response = await fetch('https://todo-e097a-default-rtdb.firebaseio.com/todo.json');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Todo Item을 가져오는데 실패하였습니다.');
    }

    return resData;
}

export async function sendTodoData(data) {
    const response = await fetch('https://todo-e097a-default-rtdb.firebaseio.com/todo.json', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Todo Item을 전송하는데 실패하였습니다.');
    }
}