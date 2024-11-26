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

export const DraftProfile: FC = () => {
	const [draftItem, setDraftItem] = useState<DraftSession | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [artistList, setArtistList] = useState<CollectionArtist[]>([]);
	const [collections, setCollections] = useState<Collection[]>([]);
	const [collectionItems, setCollectionItems] = useState<DataCollectionItem[]>([]);
	const draftId = useParams().id;

	useEffect(() => {
		console.log("DraftList mounted");

		if (!draftId) return;

		const fecthData = async () => {
			const { data } = await httpService.get(`/draft-admin/${draftId}`);
			setDraftItem(data.result);
		};

		fecthData();

		return () => {
			console.log("DraftList unmounted");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSearch = async () => {
		const { data } = await httpService.get(`draft/artist-search?q=${searchTerm}`);
		if (data.resultStatus.success) {
			setArtistList(data.result.data);
		}
	};

	const handleArtistCollections = async (artistId: string) => {
		const { data } = await httpService.get(`draft/artist-album-search?id=${artistId}`);
		if (data.resultStatus.success) {
			setCollections(data.result);
		}
	};

	const handleFetchCollectionItems = async (collection: Collection) => {
		const { data } = await httpService.post(`draft/artist-track-search`, {
			collectionId: collection.collectionId,
			collectionTitle: collection.collectionTitle,
			collectionCover: collection.collectionCover
		});
		if (data.resultStatus.success) {
			console.log(data.result);
			setCollectionItems(data.result);
		}
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
