import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export default function ConterButton(){
    const {incrementar, decrementar,toggleTema, tema} = useContext(CounterContext)


    return(
        <section className="buttons-context">
            <button onClick={incrementar}>Incrementar +1</button>
            <button onClick={decrementar}>Decrementar -1</button>
            <button onClick={toggleTema}>{tema=== "claro" ? "🌙" : "☀️"}</button>
        </section>
    )
}