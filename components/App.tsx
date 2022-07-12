import { React } from "../dep.ts";

function App() {
  const [colorList, setColorList] = React.useState([]);
  const [color, setColor] = React.useState("");
  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <div className="App">
        <form method="POST" action='/' >
          <label htmlFor="colorInput">Color</label>
          <input  name="color" id="color" type="text" />
          <button type="submit">
            Submit
          </button>
        </form>
        {colorList.map((val, index) => {
          return (
            <li style={{ "color": val }} key={index}>
              {val}
            </li>
          );
        })}
      </div>
    </>
  );
}

export default App;
