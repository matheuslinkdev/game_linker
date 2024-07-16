export type GameProps = {
  name: string;
  id: string;
  description: string;
  background_image: string;
  description_raw: string;
  genres: GenreProps[]; 
  developers: {
    name: string;
  }[];
  parent_platforms: [];
  short_screenshots: [];
  platforms: {
    platform: {
      name: string;
    };
  }[];
  stores: {
    store: {
      name: string;
    };
  }[];
  released: string;
  rating: number;
  website: string;

  games: [
    game: {
      name: string;
      background_image?: string;
      id: number;
      genres: [
        genre: {
          name: string;
        }
      ];
    }
  ];
};

export interface TargetGameProps {
  targetGame: GameProps;
}

export interface StateProps {
  onSearchResults: (results: []) => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export interface FilterProps {
  onFilterResults: (results: [], genre: string, page: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setSelectedGenre: (genre: string) => void;
}

export interface GenreProps {
  id: number;
  name: string;
}

export interface HomeProps {}
