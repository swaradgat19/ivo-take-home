import "./App.css";
import jsonData from "./data/input.json";
import { Item } from "./components/Item";

function App() {
  const documentData = jsonData;

  const mentionsMap: {
    [key: string]: JSX.Element;
  } = {};

  return (
    <div className="App">
      {documentData.map((item) => {
        return (
          <Item
            {...item}
            key={item.title}
            parentType="div"
            mentionsMap={mentionsMap}
          />
        );
      })}
    </div>
  );
}

export default App;
