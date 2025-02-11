import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

import { PropertiesResponse, PropertyType } from '../../app/types';

const filePath = path.resolve(process.cwd(), 'data/properties.json');

function handleGet(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
      }

      const fileData = fs.readFileSync(filePath, 'utf-8');
      const { location, price, propertyType } = req.query;
      const properties = JSON.parse(fileData);

      const filterByPropertyType = properties.filter((property: PropertiesResponse) =>
        propertyType ? property.propertyType.includes(propertyType as PropertyType) : true
      );

      const filterByLocation = filterByPropertyType.filter((property: PropertiesResponse) =>
        location ? property.location.toLowerCase().includes(String(location).toLowerCase()) : true
      );

      const filterByPrice = filterByLocation.filter((property: PropertiesResponse) => {
        if (!price) return true;
        const userPrice = parseFloat(price as string);
        return property.price <= userPrice;
      });

      res.status(200).json(filterByPrice);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read data.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const properties = JSON.parse(fileData);
  const request = { ...req.body };

  if (
    request.title === ' ' ||
    request.location === ' ' ||
    request.price === ' ' ||
    request.type === ' '
  ) {
    return res.status(400).json({ message: 'All fields are required', code: 'GENERIC' });
  }
  properties.push(request);
  const updatedData = JSON.stringify(properties);
  await new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, updatedData, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  return res.status(201).json({ ...req.body });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
      return handleGet(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
