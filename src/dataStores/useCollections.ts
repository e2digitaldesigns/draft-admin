import { create, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { Collection, CollectionArtist, DataCollectionItem, DraftSession } from "../types";

export interface ICollectionStore {
	draftProfile: DraftSession | null;
	searchTerm: string;
	artistList: CollectionArtist[];
	collections: Collection[];
	collectionItems: DataCollectionItem[];

	selectedSearchTerm: string;
	selectedArtistId: string;
	selectedCollection: Collection | null;

	songIdsFromSelections: () => string[];
	filterAvailableSongs: () => DataCollectionItem[];

	draftDataHydration: (data: DraftSession) => void;
	setSearchTerm: (searchTerm: string) => void;
	setArtistList: (artistList: CollectionArtist[]) => void;
	setSelectedSearchTerm: () => void;
	setCollections: (collections: Collection[]) => void;
	setCollectionItems: (collectionItems: DataCollectionItem[]) => void;
	setSelectedArtistId: (artistId: string) => void;
	setSelectedCollection: (collection: Collection) => void;
}

const useVotingDataStore = create(
	persist<ICollectionStore>(
		(set: StoreApi<ICollectionStore>["setState"], get: StoreApi<ICollectionStore>["getState"]) => {
			return {
				draftProfile: null,
				searchTerm: "",
				artistList: [],
				collections: [],
				collectionItems: [],

				selectedArtistId: "",
				selectedCollection: null,
				selectedSearchTerm: "",

				songIdsFromSelections: () =>
					get().draftProfile?.dataCollection.map((item: DataCollectionItem) => item.songId) || [],

				filterAvailableSongs: () =>
					get().collectionItems.filter(
						item => !get().songIdsFromSelections()?.includes(item.songId)
					),

				draftDataHydration: (data: DraftSession) => {
					set({ draftProfile: data });
				},

				setSearchTerm: (searchTerm: string) => {
					set({ searchTerm });
				},

				setArtistList: (artistList: CollectionArtist[]) => {
					set({ artistList });
				},

				setSelectedSearchTerm: () => {
					set({ selectedSearchTerm: get().searchTerm });
				},

				setSelectedArtistId: (artistId: string) => {
					set({ selectedArtistId: artistId });
				},

				setCollections: (collections: Collection[]) => {
					set({ collections, selectedCollection: collections[0] || null });
				},

				setCollectionItems: (collectionItems: DataCollectionItem[]) => {
					set({ collectionItems });
				},

				setSelectedCollection: (collection: Collection) => {
					set({ selectedCollection: collection });
				}
			};
		},
		{
			name: "STORAGE_KEY.THE_DRAFT__s"
		}
	)
);

export default useVotingDataStore;
