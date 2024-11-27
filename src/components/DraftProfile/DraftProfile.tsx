import { FC, useEffect, useState } from "react";
import * as Styled from "./DraftProfile.styles";
import { CollectionMenu } from "./CollectionMenu/CollectionMenu";
import { CollectionItems } from "./CollectionItems/CollectionItems";
import { useParams } from "react-router";
import httpService from "../../Api/httpService";
import { SelectedItems } from "./SelectedItems/SelectedItems";
import { ArtistList } from "./ArtistList/ArtistList";
import { Header } from "./Header/Header";
import { Collection, CollectionArtist, DataCollectionItem, DraftSession } from "../../types";
import _cloneDeep from "lodash/cloneDeep";
import { useFetchArtist, useFetchArtistCollection, useFetchArtistCollectionItems } from "../../Api";

export const DraftProfile: FC = () => {
	const draftId = useParams().id;

	const [draftItem, setDraftItem] = useState<DraftSession | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [artistList, setArtistList] = useState<CollectionArtist[]>([]);
	const [collections, setCollections] = useState<Collection[]>([]);
	const [collectionItems, setCollectionItems] = useState<DataCollectionItem[]>([]);

	const [selectedSearchTerm, setSelectedSearchTerm] = useState<string>("");
	const [selectedArtistId, setSelectedArtistId] = useState<string>("");
	const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

	// fetch artists on search
	const { data: artistData, isPending: artistIsPending } = useFetchArtist(selectedSearchTerm);

	// fetch collections on artist selection
	const { data: artistCollectionData, isPending: artistCollectionIsPending } =
		useFetchArtistCollection(selectedArtistId);

	// fectch collectin items on collection selection
	const { data: artistCollectionItemsData, isPending: artistCollectionItemsIsPending } =
		useFetchArtistCollectionItems(selectedCollection || collections[0] || {});

	// parse artist search data
	useEffect(() => {
		if (!artistData || artistIsPending) return;

		setArtistList(artistData);
	}, [artistIsPending, artistData]);

	// parse artist collection data
	useEffect(() => {
		if (!artistCollectionData || artistCollectionIsPending) return;

		setCollections(artistCollectionData);
	}, [artistCollectionIsPending, artistCollectionData]);

	// parse artist collection items data
	useEffect(() => {
		if (!artistCollectionItemsData || artistCollectionItemsIsPending) return;

		setCollectionItems(artistCollectionItemsData);
	}, [artistCollectionItemsIsPending, artistCollectionItemsData]);

	// fetch draft data
	useEffect(() => {
		if (!draftId) return;

		const fecthData = async () => {
			const { data } = await httpService.get(`/draft-admin/${draftId}`);
			setDraftItem(data.result);
		};

		fecthData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////

	const handleSearch = async () => {
		setSelectedSearchTerm(searchTerm);
	};

	const handleArtistCollections = async (artistId: string) => {
		setSelectedArtistId(artistId);
	};

	const handleFetchCollectionItems = async (collection: Collection) => {
		setSelectedCollection(collection);
	};

	const handleCollectionAddItems = async (item: DataCollectionItem) => {
		if (!draftId) return;
		const { data } = await httpService.patch(`draft-admin/${draftId}`, {
			...item
		});

		if (data.resultStatus.success) {
			const newDraftItem = _cloneDeep(draftItem);
			if (!newDraftItem) return;
			newDraftItem.dataCollection = data.result;
			setDraftItem(newDraftItem);
		}
	};

	const handleCollectionRemoveItems = async (itemId: string) => {
		if (!draftId) return;
		const { data } = await httpService.delete(`draft-admin/${draftId}/${itemId}`);

		if (data.resultStatus.success) {
			const newDraftItem = _cloneDeep(draftItem);
			if (!newDraftItem) return;
			newDraftItem.dataCollection = data.result;
			setDraftItem(newDraftItem);
		}
	};

	const songIdsFromSelections =
		draftItem?.dataCollection.map((item: DataCollectionItem) => item.songId) || [];

	const filterAvailableSongs = collectionItems.filter(
		item => !songIdsFromSelections?.includes(item.songId)
	);

	return (
		<Styled.DraftProfileWrapper>
			<Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

			<Styled.DraftProfileContentWrapper>
				<ArtistList artistList={artistList} handleArtistCollections={handleArtistCollections} />

				<CollectionMenu
					collections={collections}
					filterAvailableSongs={filterAvailableSongs}
					handleFetchCollectionItems={handleFetchCollectionItems}
				/>

				<CollectionItems
					collectionItems={collectionItems}
					filterAvailableSongs={filterAvailableSongs}
					handleCollectionAddItems={handleCollectionAddItems}
					handleCollectionRemoveItems={handleCollectionRemoveItems}
					songIdsFromSelections={songIdsFromSelections}
				/>

				<SelectedItems
					draftItem={draftItem}
					draftItems={draftItem?.dataCollection || []}
					handleCollectionRemoveItems={handleCollectionRemoveItems}
				/>
			</Styled.DraftProfileContentWrapper>
		</Styled.DraftProfileWrapper>
	);
};
