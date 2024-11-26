export type MusicCollectionItem = {
	albumCover: string;
	albumId: string;
	albumTitle: string;
	artistName: string;
	preview?: string;
	songId: string;
	songTitle: string;
};

export enum MediaTypes {
	Album = "album",
	Ep = "ep",
	Single = "single"
}

export type Collection = {
	collectionId: string;
	collectionTitle: string;
	collectionCover: string;
	collectionReleaseDate: string;
	collectionTracklist: string;
	media: MediaTypes;
};

export type DataCollectionItem = MusicCollectionItem;

export type DraftSession = {
	_id: string;
	gameCode: string;
	description: string;
	name: string;
	dataCollection: DataCollectionItem[];
};

export type CollectionArtist = {
	id: string;
	link: string;
	name: string;
	nb_album: number;
	nb_fan: number;
	picture: string;
	picture_big: string;
	picture_medium: string;
	picture_small: string;
	picture_xl: string;
	radio: true;
	tracklist: string;
	type: string;
};
