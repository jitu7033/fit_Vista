import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('User:', { username, email, password });
    navigate('/'); // Redirect to Landing
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Create Account</h1>
      <p className="text-gray-400 mb-8">Join the fitness revolution! 💪</p>

      <form onSubmit={handleSignup} className="bg-gray-900 p-6 rounded-2xl w-full max-w-md shadow-lg space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-all shadow-md"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/')}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Go to Home
        </span>
      </p>
    </div>
  );
}
