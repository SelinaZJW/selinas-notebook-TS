// import ReactDOM from "react-dom"
// import NotebookApp from "../../components/NotebookApp_0.1/NotebookApp_0.1"

// ReactDOM.render(
//   <NotebookApp />, 
//   document.querySelector("#root"))

// import "./NotebookApp.module.css";
// import "../../styles/globals.css"
import { DataDisplay } from "../../components/NotebookApp_0.1/DataDisplay";
import DisplaySlider from "../../components/NotebookApp_0.1/./DisplaySlider";

export default function App() {
  
  return (
    <div className="example">
      <main>
        <h1>Notebook Version 0.1</h1>

        {/* <section>
          <span>
          Display: <Slider
          aria-label="Display"
          defaultValue={1}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={true}
          min={1}
          max={3}
        />
          </span>
        </section> */}
        <DisplaySlider />
        
        
        <section className="got-lineage">
          <DataDisplay />
        </section>
        
      </main>
      
    </div>
  );
}
