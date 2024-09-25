import { useEffect } from "react";
import "./App.css";

export const API_URL = "http://localhost:3001/api/users";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token);

      // await fetch(API_URL).then((res) => console.log("data", res));
    };
    fetchData();
  }, []);

  return <div>App</div>;
};

export default App;
