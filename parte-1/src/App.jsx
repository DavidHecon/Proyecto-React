import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("El usuario es obligatorio"),
  email: yup.string().email("Email no válido").required("El email es obligatorio"),
}).required();

export default function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    setSubmittedData(data);
     reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <label className="block mb-2">
          Usuario
          <input
            {...register("username")}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            placeholder="Usuario"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </label>

        <label className="block mb-4 mt-4">
          Email
          <input
            {...register("email")}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-green-100 rounded text-green-800 w-full max-w-md">
          <h2 className="font-bold mb-2">Datos enviados:</h2>
          <p><strong>Usuario:</strong> {submittedData.username}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>

        </div>
      )}
    </div>
  );
}
