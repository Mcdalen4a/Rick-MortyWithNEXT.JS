import { useEffect, useState } from 'react';

export default function Home() {
  const [characters, setCharacters] = useState([]);  // Para almacenar los personajes
  const [loading, setLoading] = useState(true);  // Para saber si la data está cargando
  const [search, setSearch] = useState('');  // Para almacenar el texto de búsqueda

  useEffect(() => {
    // Hacer la solicitud a la API de Rick and Morty
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Filtrar los personajes basados en el texto de búsqueda
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Consume API REST with NEXT.js</h1>

      {/* Campo de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search characters"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Mostrar personajes filtrados */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredCharacters.map((character) => (
          <div key={character.id} className="col">
            <div className="card h-100">
            <img
  src={character.image}
  alt={character.name}
  className="card-img-top"
  style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
/>

              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">
                  <strong>Status:</strong> {character.status}
                </p>
                <p className="card-text">
                  <strong>Species:</strong> {character.species}
                </p>
                <p className="card-text">
                  <strong>Gender:</strong> {character.gender}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
