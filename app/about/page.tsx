import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          About Me
        </h1>
        <p className="text-center text-lg mb-4">
          This is the About page. Add your bio, skills, and experience here!
        </p>
        <div className="text-center">
          <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

