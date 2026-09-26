import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto p-6 min-h-[70vh] flex justify-center items-center">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
