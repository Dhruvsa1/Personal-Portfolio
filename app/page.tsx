import Cabinet from "@/components/Cabinet";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to My Portfolio
          </h1>
          <p className="text-center text-lg">
            This is a personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-center text-lg mt-4">
            Ready to add custom CSS animations and make it dynamic!
          </p>
        </div>
      </main>
      <Cabinet />
    </>
  );
}

