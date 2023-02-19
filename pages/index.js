import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import NotesContainer from '@/components/NotesContainer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getUsers = async () => {
  const res = await axios.get('/api/user');
  return res.data;
};

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
        <Box mx={1}>
          {/* Navbar */}
          <Navbar />
          {/* - Symbol & Title */}
          {/* - Username (link to user page): TODO: Integrate Auth */}
          {/* - Light/Dark Toggle */}

          {/* Notes Container */}
          <NotesContainer />

          {/* - List of User's Notes with first one selected and Navbar Underneath (left) */}

          {/* - - Ability to Add a Note */}
          {/* - - Ability to Delete a Note */}

          {/* - pane that shows the note contents (right) */}

          {/* - - Ability to Edit contents (eventually, formatting the note contents) */}
        </Box>
      </main>
    </>
  );
}
