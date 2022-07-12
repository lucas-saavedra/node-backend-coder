// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react@17.0.2/index.js";

function App(colorListAtt: string[]) {
  return (
    <>
      <div className="App">
        <form method="POST" action="/">
          <label style={{ color: "white" }} htmlFor="colorInput">Color</label>
          <input name="color" id="color" type="text" />
          <button type="submit">
            Submit
          </button>
        </form>
        <ul>
          {colorListAtt.map((val, index) => {
            return (
              <li style={{ "color": val }} key={index}>
                {val}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
