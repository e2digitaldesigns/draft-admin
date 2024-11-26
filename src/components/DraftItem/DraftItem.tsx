/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import httpService from "../../Api/httpService";
import { useParams } from "react-router";

export const DraftItem: FC = () => {
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

	const filterAvailableSongs = () => {
		const songIdsFromSelections = draftItem?.collection.map((item: any) => item.songId);
		return collectionItems.filter((item: any) => !songIdsFromSelections.includes(item.songId));
	};

	return (
		<>
			<h1>draft item</h1>

			<div>
				{draftItem?.name} - {draftItem?.description} - {draftItem?.gameCode}
			</div>

			<div>
				<div>
					<input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
					<button onClick={handleSearch}>search</button>
				</div>

				<div>
					{artistList.map(artist => (
						<div key={artist.id} onClick={() => handleArtistCollections(artist.id)}>
							<img src={artist.picture_small} alt={artist.name} />
							{artist.id}-{artist.name}
						</div>
					))}
				</div>
				<hr />
				<div>
					{collections.map(collection => (
						<div
							key={collection.collectionId}
							onClick={() => handleFetchCollectionItems(collection)}
						>
							<img src={collection.collectionCover} alt={collection.title} width="80px" />
							{collection.collectionTitle} - {collection.collectionId}
						</div>
					))}
				</div>
				<div>
					available song
					{filterAvailableSongs().map((item: any) => (
						<div key={item.songId}>
							{item.songTitle} - {item.songId}{" "}
							<button onClick={() => handleCollectionAddItems(item)}>add</button>{" "}
						</div>
					))}
				</div>
				<div>
					songs
					{draftItem?.collection.map((item: any) => (
						<div key={item.songId}>
							{item.songTitle} - {item.songId}{" "}
							<button onClick={() => handleCollectionRemoveItems(item.songId)}>remove</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
