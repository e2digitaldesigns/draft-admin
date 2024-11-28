import React, { useEffect } from "react";

import * as Styled from "./CollectionItems.styles";
import { MinusSquare, PlusSquare } from "react-feather";

import useVotingDataStore from "../../../dataStores/useCollections";
import {
	useAddCollectionItem,
	useFetchArtistCollectionItems,
	useRemoveCollectionItem
} from "../../../Api";

export const CollectionItems: React.FC = () => {
	const {
		draftId,
		filterAvailableSongs,
		songIdsFromSelections,
		selectedCollection,
		collectionItems,
		setCollectionItems
	} = useVotingDataStore();

	const availableSongs = filterAvailableSongs();
	const songdIds = songIdsFromSelections();

	const { data, isPending } = useFetchArtistCollectionItems({
		collectionId: selectedCollection?.collectionId || "",
		collectionTitle: selectedCollection?.collectionTitle || "",
		collectionCover: selectedCollection?.collectionCover || ""
	});

	const addItem = useAddCollectionItem();
	const removeItem = useRemoveCollectionItem();

	useEffect(() => {
		if (!data || isPending) return;

		setCollectionItems(data);
	}, [data, isPending, setCollectionItems]);

	return (
		<>
			<Styled.CollectionItemsWrapper>
				<Styled.CollectionItemsHeader>
					<Styled.HeaderImage>
						<img src={availableSongs?.[0]?.albumCover} alt="profile" />
					</Styled.HeaderImage>
					<Styled.HeaderInfo>
						<div>{availableSongs?.[0]?.albumTitle}</div>
						<div>{availableSongs?.[0]?.artistName}</div>
					</Styled.HeaderInfo>
				</Styled.CollectionItemsHeader>

				<Styled.CollectionItemWrapper>
					{collectionItems.map(item => {
						const isSelected = songdIds.includes(item.songId);

						return (
							<Styled.CollectionItem key={item.songId} $isSelected={isSelected}>
								{item.songTitle}
								<div>
									{isSelected ? (
										<Styled.AddButton
											onClick={() =>
												removeItem.mutate({
													draftId,
													itemId: item.songId
												})
											}
										>
											<MinusSquare size={20} />
										</Styled.AddButton>
									) : (
										<Styled.AddButton onClick={() => addItem.mutate({ draftId, item })}>
											<PlusSquare size={20} />
										</Styled.AddButton>
									)}
								</div>
							</Styled.CollectionItem>
						);
					})}
				</Styled.CollectionItemWrapper>
			</Styled.CollectionItemsWrapper>
		</>
	);
};
