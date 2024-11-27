import React, { useEffect } from "react";

import * as Styled from "./CollectionItems.styles";
import { MinusSquare, PlusSquare } from "react-feather";
import { DataCollectionItem } from "../../../types";
import useVotingDataStore from "../../../dataStores/useCollections";
import { useFetchArtistCollectionItems } from "../../../Api";

interface CollectionItemsProps {
	handleCollectionAddItems: (item: DataCollectionItem) => Promise<void>;
	handleCollectionRemoveItems: (itemId: string) => Promise<void>;
}

export const CollectionItems: React.FC<CollectionItemsProps> = ({
	handleCollectionAddItems,
	handleCollectionRemoveItems
}) => {
	const {
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
										<Styled.AddButton onClick={() => handleCollectionRemoveItems(item.songId)}>
											<MinusSquare size={20} />
										</Styled.AddButton>
									) : (
										<Styled.AddButton onClick={() => handleCollectionAddItems(item)}>
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
