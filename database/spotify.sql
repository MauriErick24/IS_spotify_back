CREATE TABLE Usuario (
  idUsuario SERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  contrasenia VARCHAR(255),
  nomUsuario VARCHAR(255),
  correo VARCHAR(255)
);

CREATE TABLE Album (
  idAlbum SERIAL PRIMARY KEY,
  titulo VARCHAR(255),
  portada BYTEA
);

CREATE TABLE Cancion (
  idCancion SERIAL PRIMARY KEY,
  idArtista INTEGER REFERENCES Usuario(idUsuario),
  idAlbum INTEGER REFERENCES Album(idAlbum),
  titulo VARCHAR(255),
  genero VARCHAR(255),
  Anio INTEGER
);

CREATE TABLE PlayList (
  idPlayList SERIAL PRIMARY KEY,
  idUsuario INTEGER REFERENCES Usuario(idUsuario),
  Nombre VARCHAR(255)
);

CREATE TABLE ArchivoMusical (
  idArchivoMusical SERIAL PRIMARY KEY,
  idMusica INTEGER REFERENCES Cancion(idCancion),
  tipoArchivo VARCHAR(10),
  archivo BYTEA
);

CREATE TABLE CancionesPlaylists (
  idCancion INTEGER REFERENCES Cancion(idCancion),
  idPlaylist INTEGER REFERENCES Playlist(idPlaylist),
  PRIMARY KEY (idCancion, idPlaylist)
);


