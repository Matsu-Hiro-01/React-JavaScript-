import { useState } from "react";
import { useEffect } from "react"; 

export default
  function App() {
    const [todos, setTodos] = useState(() =>{
      const save = localStorage.getItem("todos");//localStorageからtodosを取得
      if (save) {
        return JSON.parse(save); //保存されていればそれを配列として返す
      } else {
        return []; //保存されていなければ空の配列を返す
      }
    });
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]); //todosが更新されるたびにlocalStorageに保存
    const [input, setInput] = useState("");

    const addTodo = () => {
      if (!input.trim()) return; //空の入力時には何もしない
      setTodos([...todos, input]); //inputで入力されたものをtodosに追加
      setInput(""); //inputをクリア
    };
    const removeTodo = (index) => {
      const newTodos = todos.filter((_,i) => i!== index); //index番目の要素を除外したものをnewTodosに格納
      setTodos(newTodos); //newTodosをtodosにセット
    };
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
         <div style={{
      width: "500px",
      textAlign: "center"
    }}></div>
        <h1>Todoリスト</h1>
        <input onKeyDown={(e) => e.key === "Enter" && addTodo()}
          value = {input}
          onChange = {(e) => setInput(e.target.value)}
        />
        <button onClick = {addTodo}>追加</button>
        <ul style={{textAlign: "left"}}>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => removeTodo(index)}>削除</button>
              </li>
          ) )}
        </ul>
      </div>
    )
  } 