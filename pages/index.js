import { useEffect, useState } from 'react';

export default function Home() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer la liste des canaux
    fetch('/api/channels')
      .then(res => res.json())
      .then(data => setChannels(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Catalogue de Canaux Telegram</h1>
      <div>
        {channels.map((channel) => (
          <div key={channel.id} className="channel-card">
            <img src={channel.image_url} alt={channel.name} />
            <h2>{channel.name}</h2>
            <p>{channel.description}</p>
            <a href={channel.link} target="_blank">Voir le canal</a>
          </div>
        ))}
      </div>
    </div>
  );
}
