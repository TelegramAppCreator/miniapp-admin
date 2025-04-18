export default function Home() {
  const channel = {
    name: "Nom du Canal",
    description: "Voici une description du canal Telegram pour tester l'affichage.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    link: "https://t.me/toncanal"
  };

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Catalogue de Canaux Telegram</h1>
      
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '16px',
        maxWidth: '400px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <img
          src={channel.image_url}
          alt={channel.name}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
        <h2>{channel.name}</h2>
        <p>{channel.description}</p>
        <a
          href={channel.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '10px',
            color: '#0088cc',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          👉 Rejoindre le canal
        </a>
      </div>
    </main>
  );
}
