import AuthForm from './components/AuthForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-sky-200">
      {/* Centered Column with Boundary */}
      <div className="bg-white p-10 shadow-lg border border-gray-200 rounded-lg w-full sm:max-w-md">
        <div className="flex flex-col justify-center h-full">
          <Image
            alt="logo"
            className="mx-auto w-auto"
            height={64}
            width={64}
            src="/images/logo.png"
          />

          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
            Welcome to CloseConnect!
          </h2>

          {/* Auth Form */}
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
