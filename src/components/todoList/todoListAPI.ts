export interface IRequestOptions {
  body?: any
}
export function fetchTodoList() {
  return fetch('http://localhost:3001/todos');
}
export function postTodoList(requestOptions: IRequestOptions) {
  return fetch('http://localhost:3001/todos', {
    ...requestOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}
export function patchTodoList(requestOptions: IRequestOptions, id: string) {
  return fetch(`http://localhost:3001/todos/${id}`, {
    ...requestOptions,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
}
export function deleteTodoList(id: string) {
  return fetch(`http://localhost:3001/todos/${id}`, {
    method: 'DELETE'
  });
}
