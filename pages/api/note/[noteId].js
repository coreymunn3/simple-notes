import prisma from '@/prisma/client';

export default async function handler(req, res) {
  const { noteId } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deleteUser = await prisma.note.delete({
        where: {
          id: parseInt(noteId),
        },
      });
      return res.status(200).json({
        message: `Successfully deleted ${deleteUser.title}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: `Unable to delete ${noteId}`,
      });
    }
  }
}
