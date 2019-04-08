import axios from "axios";

const URL = "https://todo-list-api-leo.herokuapp.com/todos";

class Api {
  static async getTasksUser(user) {
    return await axios
      .get(`${URL}/${user}`)
      .then(res => res.data)
      .catch(() => []);
  }

  static async createTask(task) {
    return await axios
      .post(`${URL}/create`, task)
      .then(res => res.data.todo)
      .catch(() => []);
  }

  static async updateTask(task) {
    return await axios
      .put(`${URL}/update/${task._id}`, task)
      .then(res => res.data)
      .catch(() => []);
  }

  static async deleteTask(id) {
    return await axios
      .delete(`${URL}/delete/${id}`)
      .then(res => res.data)
      .catch(() => []);
  }
}

export default Api;
