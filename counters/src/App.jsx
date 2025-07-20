import "./App.css";
import CounterProvider, { CounterContext } from "./context/CounterContext";
import CounterDisplay from "./components/CounterDisplay";
import CounterButton from "./components/CounterButton";
import { useContext, useEffect } from "react";

function MainContent() {
  const { tema } = useContext(CounterContext);

  useEffect(() => {
    document.body.className = tema;
  }, [tema]);

  return (
    <main >
      <h1>Creación de sitios web con contexto</h1>
      <CounterDisplay />
      <CounterButton />
    </main>
  );
}

function App() {
  return (
    <CounterProvider>
      <MainContent />
    </CounterProvider>
  );
}

export default App;
