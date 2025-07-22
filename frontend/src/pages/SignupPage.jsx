import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser(form));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>
        <input name="username" onChange={handleChange} placeholder="Username" className="input mb-2" />
        <input name="email" onChange={handleChange} placeholder="Email" className="input mb-2" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="input mb-4" />
        <button className="btn w-full bg-green-500 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}
