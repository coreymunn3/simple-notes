import Head from 'next/head';
import ColorModeSwitch from '@/components/ColorModeSwitch';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getUsers() {
  const res = await axios.get('/api/user');
  return res.data;
}

export default function Home() {
  const usersQuery = useQuery(['users'], getUsers, {
    onSuccess: (data) => console.log(data),
  });

  return (
    <>
      <Head>
        <title>Simple Notes</title>
      </Head>
      <main>
        <ColorModeSwitch />
        <h1>Home Page</h1>
      </main>
    </>
  );
}
