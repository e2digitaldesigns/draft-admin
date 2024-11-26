import React from "react";

import * as Styled from "./CollectionItems.styles";
import { MinusSquare, PlusSquare } from "react-feather";
import { DataCollectionItem, MusicCollectionItem } from "../../../types";

interface CollectionItemsProps {
	collectionItems: MusicCollectionItem[];
	filterAvailableSongs: MusicCollectionItem[];
	handleCollectionAddItems: (item: DataCollectionItem) => Promise<void>;
	handleCollectionRemoveItems: (itemId: string) => Promise<void>;
	songIdsFromSelections: string[];
}

export const CollectionItems: React.FC<CollectionItemsProps> = ({
	filterAvailableSongs,
	handleCollectionAddItems,
	songIdsFromSelections,
	collectionItems,
	handleCollectionRemoveItems
}) => {
	return (
		<>
			<Styled.CollectionItemsWrapper>
				<Styled.CollectionItemsHeader>
					<Styled.HeaderImage>
						<img src={filterAvailableSongs?.[0]?.albumCover} alt="profile" />
					</Styled.HeaderImage>
					<Styled.HeaderInfo>
						<div>{filterAvailableSongs?.[0]?.albumTitle}</div>
						<div>{filterAvailableSongs?.[0]?.artistName}</div>
					</Styled.HeaderInfo>
				</Styled.CollectionItemsHeader>

				<Styled.CollectionItemWrapper>
					{collectionItems.map(item => {
						const isSelected = songIdsFromSelections.includes(item.songId);

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
