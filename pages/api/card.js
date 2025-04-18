// /pages/api/cards.js

let cards = []; // Tableau en mémoire pour stocker les cartes

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Renvoie les cartes existantes
    return res.status(200).json(cards);
  }

  if (req.method === 'POST') {
    // Ajouter une carte
    const { name, description } = req.body;
    const newCard = { name, description };
    cards.push(newCard);
    return res.status(201).json(newCard);
  }

  // Si la méthode n'est pas reconnue
  return res.status(405).json({ message: 'Method Not Allowed' });
}
