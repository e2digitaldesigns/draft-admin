import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../types";
import { Collection, CollectionArtist, DataCollectionItem, MusicCollectionItem } from "../../types";
import httpService from "../httpService";
import useVotingDataStore from "../../dataStores/useCollections";
import { isArray } from "lodash";

type ArtistCollectionItemsVars = {
	collectionId: string;
	collectionTitle: string;
	collectionCover: string;
};

enum Endpoints {
	ArtistSearch = "draft/artist-search?q=",
	ArtistAlbumSearch = "draft/artist-album-search?id=",
	ArtistTrackSearch = "draft/artist-track-search"
}

enum QueryKeys {
	Artist_Search = "artist-search",
	ArtistCollectionSearch = "artist-collections-search",
	ArtistCollecionItemsSearch = "artist-collections-items-search"
}

type AddCollectionItemVars = {
	draftId: string;
	item: DataCollectionItem | DataCollectionItem[];
};

type RemoveCollectionItemVars = {
	draftId: string;
	itemId: string | string[];
};

const fetchArtist = async (searchTerm: string) => {
	const { data } = await httpService.get<ApiResponse<CollectionArtist[]>>(
		`${Endpoints.ArtistSearch}${searchTerm}`
	);

	return data.result;
};

const fetchArtistCollections = async (artistId: string) => {
	const { data } = await httpService.get<ApiResponse<Collection[]>>(
		`${Endpoints.ArtistAlbumSearch}${artistId}`
	);

	return data.result;
};

const fetchArtistCollectionItems = async (itemsObj: ArtistCollectionItemsVars) => {
	const { data } = await httpService.post<ApiResponse<DataCollectionItem[]>>(
		Endpoints.ArtistTrackSearch,
		itemsObj
	);

	return data.result;
};

const addCollectionItems = async (
	draftId: string,
	item: DataCollectionItem | DataCollectionItem[]
) => {
	if (!isArray(item)) {
		item = [item];
	}

	const { data } = await httpService.patch<ApiResponse<DataCollectionItem[]>>(
		`draft-admin/${draftId}`,
		item
	);
	return data.result;
};

const removeCollectionItem = async (draftId: string, itemId: string | string[]) => {
	if (!isArray(itemId)) {
		itemId = [itemId];
	}

	const { data } = await httpService.patch<ApiResponse<DataCollectionItem[]>>(
		`draft-admin/${draftId}/remove`,
		{ itemId }
	);
	return data.result;
};

export const useAddCollectionItem = () => {
	const { hydrateDataCollection } = useVotingDataStore();
	return useMutation<DataCollectionItem[], AxiosError<{ error: unknown }>, AddCollectionItemVars>({
		mutationFn: ({ draftId, item }) => addCollectionItems(draftId, item),
		retry: 0,
		onSuccess: hydrateDataCollection
	});
};

export const useRemoveCollectionItem = () => {
	const { hydrateDataCollection } = useVotingDataStore();
	return useMutation<
		DataCollectionItem[],
		AxiosError<{ error: unknown }>,
		RemoveCollectionItemVars
	>({
		mutationFn: ({ draftId, itemId }) => removeCollectionItem(draftId, itemId),
		retry: 0,
		onSuccess: hydrateDataCollection
	});
};

export const useFetchArtist = (searchTerm: string) => {
	return useQuery<CollectionArtist[], AxiosError<{ error: unknown }, CollectionArtist[]>>({
		queryKey: [QueryKeys.Artist_Search, searchTerm],
		queryFn: () => fetchArtist(searchTerm),
		retry: 0,
		enabled: !!searchTerm,
		staleTime: Infinity
	});
};

export const useFetchArtistCollection = (artistId: string) => {
	return useQuery<Collection[], AxiosError<{ error: unknown }>>({
		queryKey: [QueryKeys.ArtistCollectionSearch, artistId],
		queryFn: () => fetchArtistCollections(artistId),
		retry: 0,
		enabled: !!artistId,
		staleTime: Infinity
	});
};

export const useFetchArtistCollectionItems = (itemsObj: ArtistCollectionItemsVars) => {
	return useQuery<DataCollectionItem[], AxiosError<{ error: unknown }>, MusicCollectionItem[]>({
		queryKey: [QueryKeys.ArtistCollecionItemsSearch, itemsObj.collectionId],
		queryFn: async () => fetchArtistCollectionItems(itemsObj),
		retry: 0,
		enabled: !!itemsObj.collectionId,
		staleTime: Infinity
	});
};
