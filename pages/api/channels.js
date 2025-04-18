import fs from 'fs';
import path from 'path';

// Chemin vers le fichier JSON
const channelsFilePath = path.join(process.cwd(), 'data', 'channels.json');

// Fonction pour lire le fichier JSON
const readChannels = () => {
  const fileContent = fs.readFileSync(channelsFilePath, 'utf8');
  return JSON.parse(fileContent).channels;
};

// Fonction pour écrire dans le fichier JSON
const writeChannels = (channels) => {
  const data = JSON.stringify({ channels }, null, 2);
  fs.writeFileSync(channelsFilePath, data, 'utf8');
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Retourner la liste des canaux
    const channels = readChannels();
    return res.status(200).json(channels);
  }

  if (req.method === 'POST') {
    // Ajouter un nouveau canal
    const { name, description, link, contact } = req.body;

    const channels = readChannels();
    const newId = channels.length ? channels[channels.length - 1].id + 1 : 1;

    const newChannel = {
      id: newId,
      name,
      description,
      link,
      contact: contact || ''
    };

    channels.push(newChannel);
    writeChannels(channels);

    return res.status(201).json(newChannel);
  }

  if (req.method === 'PUT') {
    // Modifier un canal existant
    const { id, name, description, link, contact } = req.body;

    const channels = readChannels();
    const index = channels.findIndex(channel => channel.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    channels[index] = { ...channels[index], name, description, link, contact };
    writeChannels(channels);

    return res.status(200).json(channels[index]);
  }

  if (req.method === 'DELETE') {
    // Supprimer un canal
    const { id } = req.body;

    const channels = readChannels();
    const newChannels = channels.filter(channel => channel.id !== id);

    if (newChannels.length === channels.length) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    writeChannels(newChannels);

    return res.status(200).json({ message: 'Channel deleted' });
  }

  res.status(405).end(); // Méthode non autorisée
}
