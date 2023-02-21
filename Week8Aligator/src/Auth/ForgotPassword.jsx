import React, { useState } from 'react';

export default function ForgotPassword( {onSubmit} ) {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted", { username});
    // Add your form submission logic here
    onSubmit({username})
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}