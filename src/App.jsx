import { useState } from "react";
export default

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return; // 空の入力時には何もしない
    setTodos([...todos, {text:input, completed: false}]); // todosにinputで取得した値をを追加
    setInput("");// 入力フィールドをクリア
  }
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index); // 指定されたインデックスのTo-Doを除外
    setTodos(newTodos);
  }
  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => { // 指定されたインデックスのTo-Doの完了状態をトグル
      if (i === index) {
        return { ...todo, completed: !todo.completed }; // 完了状態をトグル
      }
      return todo; // 他のTo-Doはそのまま返す
    });
      setTodos(newTodos); // 更新されたTo-Doリストを設定
  }
  return (
    <div>
      <h1>My To-Do List</h1>
      <input onKeyDown={(e) => e.key === "Enter" && addTodo()} // EnterキーでaddTodo関数を実行    
        value={input}
        onChange={(e) => setInput(e.target.value)} // 入力フィールドの値を更新(valueの値をsetInputに設定)
        placeholder="Enter a to-do item" 
      />
      <button onClick={addTodo}>Add To-Do</button> {/*ボタンクリックでaddTodo関数を実行*/}
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}> {/*  key属性を追加*/}
          <span onClick={() => toggleComplete(index)}
            style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer", marginRight: "10px" }}>{/*完了状態に応じてテキストに取り消し線を引く*/}
            {todo.text}{/*todoの中のtextを表示するように変更 */}
          </span>
          <button onClick={() => removeTodo(index)}>削除</button> {/*削除ボタンでremoveTodo関数を実行*/}
          </li>
        ))}
      </ul>
    </div>
  )
}