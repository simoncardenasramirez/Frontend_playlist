export interface Cancion {
  titulo: string;
  artista: string;
  album?: string;
  anno?: string;
  genero?: string;
}

export interface ListaReproduccion {
  id?: number;
  nombre: string;
  descripcion?: string;
  canciones?: Cancion[]; 
}
