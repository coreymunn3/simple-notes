import prisma from '@/prisma/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // get a list of all notes
      const notes = await prisma.note.findMany();
      return res.status(200).json(notes);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  if (req.method === 'DELETE') {
    const { id, title } = req.body;
    try {
      const deleteUser = await prisma.note.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        message: `Successfully deleted ${title}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: `Unable to delete ${title}`,
      });
    }
  }
  if (req.method === 'POST') {
    const body = req.body;
    // make sure all required fields are present
    const { id, title, user_id } = body;
    if (!title || !user_id) {
      return res.status(400).json({
        message: `Cannot ${
          id ? 'update note' : 'create note'
        }; Missing required data: ${!title ? 'title' : ''} ${
          !user_id ? 'user_id' : ''
        }`,
      });
    }
    try {
      const upsertNote = await prisma.note.upsert({
        // if note with this ID exists, update it. If no ID, assume id of 0
        // which does not exist
        where: {
          id: body?.id || 0,
        },
        update: {
          ...body,
        },
        create: {
          ...body,
        },
      });
      return res.status(200).json(upsertNote);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Unable to Create or Update Note',
      });
    }
  }
}
