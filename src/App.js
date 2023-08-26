import React from 'react';
import './App.css';
import contactsData from './contacts.json';
import { useState } from 'react';

function App() {
  const [displayedContacts, setDisplayedContacts] = useState(contactsData.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contactsData.slice(5));

  const addRandomContact = () => {
    if (remainingContacts.length === 0) {
      alert('No hay más contactos disponibles.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setRemainingContacts(prevRemainingContacts =>
      prevRemainingContacts.filter(contact => contact !== randomContact)
    );
    setDisplayedContacts(prevDisplayedContacts => [...prevDisplayedContacts, randomContact]);
  };
  const orderAlphabetically = () => {
    const orderedContacts = [...displayedContacts].sort((a, b) => (a.name > b.name) ? 1 : -1);
    setDisplayedContacts(orderedContacts);
  };

  const orderByPopularity = () => {
    const orderedContacts = [...displayedContacts].sort((a, b) => b.popularity - a.popularity);
    setDisplayedContacts(orderedContacts);
  };  
  

  return (
    <div className="App">
      <div>
        <h1>Contactos</h1>
        <button className='btn-add' onClick={addRandomContact}>Agregar Contacto Aleatorio</button>
        <button className='btn-add' onClick={orderAlphabetically}>Ordenar Alfabéticamente</button>
        <button className='btn-add' onClick={orderByPopularity}>Ordenar por Popularidad</button>
        <table className='table-contacts'>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Popularidad</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
            </tr>
          </thead>
          <tbody>
            {displayedContacts.map((contact, index) => (
              <tr key={index}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} style={{ width: '50px' }} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar ? "🏆" : ""}</td>
                <td>{contact.wonEmmy ? "🏆" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
