export type pelicula = {
  _id: string;
  brand: string;
  name: string;
  iso: number;
  formatThirtyFive: boolean;
  formatOneTwenty: boolean;
  color: boolean;
  process: string;
  staticImageUrl: string;
  description: string;
  customDescription: any[];
  keyFeatures: { _id: string; feature: string }[];
  dateAdded: string;
  __v: number;
};

export type peliculasProyects = {
  peliculas: pelicula;
  quantity: number;
  nameP:string; 
};

export type NameProyect = {
    nameProyect:string; 
}


