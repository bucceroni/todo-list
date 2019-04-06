import axios from "axios";

const URL = "https://todo-list-api-leo.herokuapp.com/todos";

class Api {
  static async getUserTodos(user) {
    return await axios
      .get(`${URL}/${user}`)
      .then(res => res.data)
      .catch(() => []);
  }

  static async createTodo(todo) {
    return await axios
      .post(`${URL}/create`, todo)
      .then(res => res.data.todo)
      .catch(() => []);
  }

  static async updateTodo(task) {
    return await axios
      .put(`${URL}/update/${task._id}`, task)
      .then(res => res.data)
      .catch(() => []);
  }

  static async deleteTodo(id) {
    return await axios
      .delete(`${URL}/delete/${id}`)
      .then(res => res.data)
      .catch(() => []);
  }
}

export default Api;
