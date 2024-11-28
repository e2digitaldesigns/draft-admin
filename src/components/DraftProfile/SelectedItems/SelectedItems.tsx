import React from "react";
import * as Styled from "./SelectedItems.styles";
import { MinusSquare } from "react-feather";
import useVotingDataStore from "../../../dataStores/useCollections";
import { useRemoveCollectionItem } from "../../../Api";

export const SelectedItems: React.FC = () => {
	const { draftId, draftProfile } = useVotingDataStore();
	const removeItem = useRemoveCollectionItem();

	return (
		<Styled.SelectedItemWrapper>
			<Styled.SelectedHeader>
				{draftProfile?.name} - {draftProfile?.description} - {draftProfile?.gameCode}
			</Styled.SelectedHeader>
			<Styled.SelectedItems>
				{draftProfile?.dataCollection?.map(item => (
					<Styled.SelectedItem key={item.songId}>
						<Styled.ItemImageWrapper>
							<img src={item.albumCover} alt="profile" />
						</Styled.ItemImageWrapper>

						<Styled.ItemInfo>
							<div>{item.songTitle}</div>

							<div>
								{item.artistName} - {item.albumTitle}
							</div>
						</Styled.ItemInfo>

						<Styled.RemoveButton
							onClick={() => removeItem.mutate({ draftId, itemId: item.songId })}
						>
							<MinusSquare size={20} />
						</Styled.RemoveButton>
					</Styled.SelectedItem>
				))}
			</Styled.SelectedItems>
		</Styled.SelectedItemWrapper>
	);
};
