import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Aplicación de Notas con Next.js y MongoDB</title>
        <meta name="description" content="Aplicación CRUD de notas con Next.js y MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>
    </>
  );
}
