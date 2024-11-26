import React from "react";
import * as Styled from "./SelectedItems.styles";
import { MinusSquare } from "react-feather";
import { DraftSession, MusicCollectionItem } from "../../../types";

interface SelectedItemsProps {
	draftItem: DraftSession | null;
	draftItems: MusicCollectionItem[];
	handleCollectionRemoveItems: (itemId: string) => Promise<void>;
}
export const SelectedItems: React.FC<SelectedItemsProps> = ({
	draftItem,
	draftItems,
	handleCollectionRemoveItems
}) => {
	return (
		<Styled.SelectedItemWrapper>
			<Styled.SelectedHeader>
				{draftItem?.name} - {draftItem?.description} - {draftItem?.gameCode}
			</Styled.SelectedHeader>
			<Styled.SelectedItems>
				{draftItems.map(item => (
					<Styled.SelectedItem key={item.songId}>
						<Styled.ItemImageWrapper>
							<img src={item.albumCover} alt="profile" />
						</Styled.ItemImageWrapper>

						<Styled.ItemInfo>
							<div> {item.songTitle}</div>

							<div>
								{item.artistName} - {item.albumTitle}
							</div>
						</Styled.ItemInfo>

						<Styled.RemoveButton onClick={() => handleCollectionRemoveItems(item.songId)}>
							<MinusSquare size={20} />
						</Styled.RemoveButton>
					</Styled.SelectedItem>
				))}
			</Styled.SelectedItems>
		</Styled.SelectedItemWrapper>
	);
};
