// import ReactDOM from "react-dom"
// import NotebookApp from "../../components/NotebookApp_0.1/NotebookApp_0.1"

// ReactDOM.render(
//   <NotebookApp />, 
//   document.querySelector("#root"))

// import "./NotebookApp.module.css";
// import "../../styles/globals.css"
import { Content } from "../../components/NotebookApp_0.1/Content";

export default function App() {
  return (
    <div>
      <main>
        <h1>Notebook Version 0.1</h1>
        
        <section className="content">
          <Content />
        </section>
        
      </main>
      
    </div>
  );
}
