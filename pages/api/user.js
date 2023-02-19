import prisma from '@/prisma/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // get prisma to get all users
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Unable to find Users',
      });
    }
  }
}
