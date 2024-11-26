/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as Styled from "./SelectedItems.styles";
import { MinusSquare } from "react-feather";

interface SelectedItemsProps {
	draftItem: any;
	draftItems: any[];
	handleCollectionRemoveItems: any;
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
				{draftItems.map((item: any) => (
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
