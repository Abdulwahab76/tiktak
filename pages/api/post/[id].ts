import type { NextApiRequest, NextApiResponse } from 'next';

import { postDetailQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';
import { uuid } from 'uuidv4';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if (req.method === 'PUT') {
    const { comment, userId, data: res } = req.body;

    const { id }: any = req.query;
    console.log('==', res, id);

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: 'postedBy', _ref: userId },
        },
      ])
      .commit();


    res.status(200).json(data);
  }
  else if (req.method === 'DELETE') {
    const { id } = req.query;
    const { data } = req.body;
    console.log('work',id)
  }

}
