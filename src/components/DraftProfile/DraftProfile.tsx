/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import * as Styled from "./DraftProfile.styles";
import { CollectionMenu } from "./CollectionMenu/CollectionMenu";
import { CollectionItems } from "./CollectionItems/CollectionItems";
import { useParams } from "react-router";
import httpService from "../../Api/httpService";
import { SelectedItems } from "./SelectedItems/SelectedItems";
import { ArtistList } from "./ArtistList/ArtistList";
import { Header } from "./Header/Header";

export const DraftProfile: FC = () => {
	const [draftItem, setDraftItem] = useState<any>();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [artistList, setArtistList] = useState<any[]>([]);
	const [collections, setCollections] = useState<any[]>([]);
	const [collectionItems, setCollectionItems] = useState<any[]>([]);
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
			console.log(data.result);
			setCollections(data.result);
		}
	};

	const handleFetchCollectionItems = async (collection: any) => {
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

	const handleCollectionAddItems = async (item: any) => {
		if (!draftId) return;
		const { data } = await httpService.patch(`draft-admin/${draftId}`, {
			...item
		});

		setDraftItem((prev: any) => {
			return { ...prev, collection: data.result };
		});
	};

	const handleCollectionRemoveItems = async (itemId: string) => {
		if (!draftId) return;
		const { data } = await httpService.delete(`draft-admin/${draftId}/${itemId}`);
		if (data.resultStatus.success) {
			setDraftItem((prev: any) => {
				return { ...prev, collection: data.result };
			});
		}
	};

	const songIdsFromSelections = draftItem?.collection.map((item: any) => item.songId);
	const filterAvailableSongs = collectionItems.filter(
		(item: any) => !songIdsFromSelections.includes(item.songId)
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
					filterAvailableSongs={filterAvailableSongs}
					handleCollectionAddItems={handleCollectionAddItems}
					songIdsFromSelections={songIdsFromSelections}
					collectionItems={collectionItems}
					handleCollectionRemoveItems={handleCollectionRemoveItems}
				/>

				<SelectedItems
					draftItem={draftItem}
					draftItems={draftItem?.collection || []}
					handleCollectionRemoveItems={handleCollectionRemoveItems}
				/>
			</Styled.DraftProfileContentWrapper>
		</Styled.DraftProfileWrapper>
	);
};
