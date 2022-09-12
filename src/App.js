import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { EventEmitter } from "fbemitter";
import ProAm1Dance from "./components/ProAm1Dance";

export const appEmitter = new EventEmitter();

const App = () => {

  return (
    <div className="App">
      <ProAm1Dance/>
    </div>
  );
};

export default App;
