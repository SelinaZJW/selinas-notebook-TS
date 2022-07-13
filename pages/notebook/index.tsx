import React from "react";
import { Provider } from 'react-redux'
import Content from "../../components/NotebookView/Content";
import store from "../../src/store/store"

export function Main() {

  return (
      <div>
        <main>
          <h1>Notebook Version 3.0</h1>
          
          <section className="content">
            <Content />
          </section>
        </main>
        
      </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
