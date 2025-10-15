import { useState } from 'react'
import './App.css'
import BlackList from './assets/Images/Blacklist.png'
import Macario from './assets/Images/Macario.png'
import Oppenheimer from './assets/Images/Oppenheimer.png'



// Styles for different themes
const getTheme = (type) => {
  switch(type) {
    case 'Serie': // Blacklist 
      return {
        background: 'linear-gradient(135deg, #1A0A0A 0%, #2C0F0F 100%)',
        accent: '#C41E3A',
        secondary: '#2C2C2C',
        text: '#FFFFFF',
        navBar: '#1A0505',
        itemBg: '#C41E3A',
        itemBgHover: '#E02C4A'
      };
    case 'Pelicula': // Oppenheimer 
      return {
        background: 'linear-gradient(135deg, #FF6B00 0%, #FF3D00 100%)',
        accent: '#FFB347',
        secondary: '#D35400',
        text: '#FFF8DC',
        navBar: '#CC5500',
        itemBg: '#FFB347',
        itemBgHover: '#FFD700'
      };
    case 'Libro': // Macario 
      return {
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        accent: '#1ABC9C',
        secondary: '#9B59B6',
        text: '#F8F5E3',
        navBar: '#1F2937',
        itemBg: '#1ABC9C',
        itemBgHover: '#48C9B0'
      };
    default: 
      return {
        background: 'linear-gradient(135deg, #0E1A40 0%, #1A2A5E 100%)',
        accent: '#B76E00',
        secondary: '#7E7E7E',
        text: '#FFFFFF',
        navBar: 'darkblue',
        itemBg: '#B76E00',
        itemBgHover: '#D68A00'
      };
  }
};

const rootContainer = (theme) => ({
  background: theme.background,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  minWidth: '100vh',
  color: theme.text,
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  transition: 'all 0.5s ease',
})

const navBarStyle = (theme) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  margin: '16px',
  backgroundColor: theme.navBar,
  listStyleType: 'none',
  borderRadius: '8px',
  border: `2px solid ${theme.secondary}`,
  transition: 'all 0.5s ease',
})

const ItemNavBarStyle = (theme, isSelected) => ({
  padding: '8px',
  marginRight: '16px',
  borderRadius: '8px',
  backgroundColor: isSelected ? theme.itemBgHover : theme.itemBg,
  border: `2px solid ${theme.secondary}`,
  boxShadow: isSelected ? '0 0 15px rgba(255,255,255,0.3)' : '0 0 5px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s',
  margin: '5px',
  color: theme.text,
  justifyContent: 'center',
  alignItems: 'center',
  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
})

const MainHeader = () => {
  return(
    <header>
      <h1>Mis Favoritos</h1>
    </header>
  );
}

const NavBar = (props) =>{
  return(
    <nav>
      <ul style={navBarStyle(props.theme)}>
        {props.dataFavoritos.map((Favorito) => {
          const isSelected = props.selectedFavorito?.id === Favorito.id;
          return (
            <li key={Favorito.id}
                onClick={() => props.fncClick(Favorito)}
                style={ItemNavBarStyle(props.theme, isSelected)}>
                <img
                src={Favorito.imageAsset}
                alt={Favorito.name}
                style={{ width: "30px", height: "30px", marginRight: "8px", verticalAlign: "middle", borderRadius: "5px" }}
              />
              {Favorito.type}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const MainContent = (props) => {
  return(
    <main>
      <section>
        <h2>{props.data ? props.data.name : "Selecciona una opcion"}</h2>
      </section>
    </main>
  );
}

const AsideContent = (props) => {
  return(
    <aside>
      <div>
      <img
        src={props.data ? props.data.imageAsset : ''}
        alt={props.data ? props.data.name : ''}
        style={{ width: '150px', height: '150px', borderRadius: '8px', margin: '16px' }}
      />
      </div>
      <div>
        <p>{props.data ? props.data.sinopsis : ''}</p>
      </div>
    </aside>
  );
}

const FooterContent = () => {
  return(
    <footer>
      <p>Copyright 2025</p>
    </footer>
  );
}

function App() {
  const [Favorito , setFavorito] = useState();

  const HandleCLick = (Data) => {
    setFavorito(Data);
    console.log(Data);
  }
  const Favoritos =[
    { id:1,
      type: 'Serie',
      name: 'Blacklist',
      sinopsis: 'Raymond "Red" Reddington, uno de los criminales más buscados por el FBI, se entrega misteriosamente tras años prófugo. A cambio de inmunidad, ofrece una lista con los delincuentes más peligrosos que el mundo ignora, pero solo trabajará con la agente Elizabeth Keen, una joven analista con un pasado tan enigmático como el de él. A lo largo de la serie, secretos, traiciones y giros inesperados revelan la verdadera conexión entre ambos.',
      imageAsset: BlackList,
    },
    { id:2,
      type: 'Pelicula',
      name: 'Oppenheimer',
      sinopsis: 'Dirigida por Christopher Nolan, narra la vida del físico J. Robert Oppenheimer, el "padre de la bomba atómica". La película explora su papel crucial en el Proyecto Manhattan durante la Segunda Guerra Mundial y las consecuencias morales y personales que enfrentó tras crear el arma más destructiva de la historia. Es un retrato intenso del genio, la culpa y el poder.',
      imageAsset: Oppenheimer,
    },
    { id:3,
      type: 'Libro',
      name: 'La locura de Macario',
      sinopsis: 'En este relato breve, Arreola presenta a Macario, un hombre inocente y de mente simple que vive bajo la opresión de su tía y su madrina. A través de su ingenuidad y monólogo interior, el autor retrata la locura, la soledad y la represión religiosa con un tono trágico y poético. Es una crítica profunda a la sociedad que margina la diferencia y la pureza.',
      imageAsset: Macario,
    },
  ];

  const currentTheme = getTheme(Favorito?.type);

  return (
    <div style={rootContainer(currentTheme)}>
      <MainHeader />
      <NavBar
        dataFavoritos={Favoritos}
        fncClick={HandleCLick}
        selectedFavorito={Favorito}
        theme={currentTheme} />
      <div>
        <AsideContent  data={Favorito} />
        <MainContent data={Favorito} />
      </div>
      <div>
        <FooterContent />
      </div>
    </div>
  )
}

export default App