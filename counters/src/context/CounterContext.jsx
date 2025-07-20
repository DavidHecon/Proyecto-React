import { createContext, useState } from "react";

export const CounterContext = createContext()

export default function CounterProvider({children}){
    const [count, setCount] = useState(0)
    const [tema, setTema] = useState("claro")


    const toggleTema = () => {
         setTema(prev => (prev === "claro" ? "oscuro" : "claro"))
    }

    const incrementar = () => setCount((prev)=> prev + 1)
    const decrementar = () => setCount((prev)=> prev - 1)

    return (
        <CounterContext.Provider value={{count, incrementar, decrementar, toggleTema ,tema}}>
            {children}
        </CounterContext.Provider>
    )
}