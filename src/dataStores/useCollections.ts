import { create, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import _cloneDeep from "lodash/cloneDeep";
import {
	Collection,
	CollectionArtist,
	MediaTypes,
	DataCollectionItem,
	DraftSession
} from "../types";
import httpService from "../Api/httpService";

export interface ICollectionStore {
	draftId: string;
	draftProfile: DraftSession | null;
	searchTerm: string;
	artistList: CollectionArtist[];
	collections: Collection[];
	collectionItems: DataCollectionItem[];

	collectionFilter: MediaTypes | null;

	selectedSearchTerm: string;
	selectedArtistId: string;
	selectedCollection: Collection | null;

	songIdsFromSelections: () => string[];
	filterAvailableSongs: () => DataCollectionItem[];

	draftDataHydration: (draftId: string) => void;
	setSearchTerm: (searchTerm: string) => void;
	setArtistList: (artistList: CollectionArtist[]) => void;
	setSelectedSearchTerm: () => void;
	setCollections: (collections: Collection[]) => void;
	setCollectionItems: (collectionItems: DataCollectionItem[]) => void;
	setSelectedArtistId: (artistId: string) => void;
	setSelectedCollection: (collection: Collection) => void;

	hydrateDataCollection: (data: DataCollectionItem[]) => void;
	setCollectionFilter: (filter: MediaTypes) => void;

	setAudioFile: (songId: string, file: string) => void;
	audioFile: { songId: string; file: string } | null;
	audioProgress: number;
	audioPlayerState: "playing" | "paused" | "stopped";
	setAudioProgress: (progress: number) => void;
	setAudioPlayerState: (state: "playing" | "paused" | "stopped") => void;
}

const useVotingDataStore = create(
	persist<ICollectionStore>(
		(set: StoreApi<ICollectionStore>["setState"], get: StoreApi<ICollectionStore>["getState"]) => {
			return {
				draftId: "",
				draftProfile: null,
				searchTerm: "",
				artistList: [],
				collections: [],
				collectionItems: [],
				collectionFilter: null,

				selectedArtistId: "",
				selectedCollection: null,
				selectedSearchTerm: "",
				audioFile: null,
				audioProgress: 0,
				audioPlayerState: "stopped",

				songIdsFromSelections: () =>
					get().draftProfile?.dataCollection.map((item: DataCollectionItem) => item.songId) || [],

				filterAvailableSongs: () =>
					get().collectionItems.filter(
						item => !get().songIdsFromSelections()?.includes(item.songId)
					),

				draftDataHydration: async (draftId: string) => {
					try {
						const { data } = await httpService.get(`/draft-admin/${draftId}`);
						if (!data?.resultStatus?.success) throw new Error("Error fetching draft data");
						set({ draftId, draftProfile: data.result });
					} catch (error) {
						console.error("Error in data fetch:", error);
					}
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
				},

				hydrateDataCollection: data => {
					if (!data) return;
					const draftProfile = _cloneDeep(get().draftProfile);
					draftProfile!.dataCollection = data;
					set({ draftProfile });
				},

				setCollectionFilter: (filter: MediaTypes | null) => {
					set({ collectionFilter: get().collectionFilter ? null : filter });
				},

				setAudioFile: (songId, file) => {
					set({ audioFile: { songId, file }, audioProgress: 0 });
				},

				setAudioProgress: progress => {
					set({ audioProgress: progress });
				},

				setAudioPlayerState: state => {
					set({ audioPlayerState: state });
				}
			};
		},
		{
			name: "STORAGE_KEY.THE_DRAFT__s"
		}
	)
);

export default useVotingDataStore;
