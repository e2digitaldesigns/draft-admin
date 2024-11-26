/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import * as Styled from "./CollectionMenu.styles";

interface CollectionMenuProps {
	collections: any;
	filterAvailableSongs: any;
	handleFetchCollectionItems: any;
}

export const CollectionMenu: FC<CollectionMenuProps> = ({
	collections,
	filterAvailableSongs,
	handleFetchCollectionItems
}) => {
	return (
		<Styled.CollectionMenuWrapper>
			<Styled.ActiveItem>
				<img src={filterAvailableSongs?.[0]?.albumCover} alt="profile" />
			</Styled.ActiveItem>

			<Styled.CollectionMenu>
				{collections.map((collection: any) => (
					<Styled.CollectionMenuButton
						key={collection.collectionId}
						onClick={() => handleFetchCollectionItems(collection)}
					>
						<img src={collection.collectionCover} alt={collection.title} />
					</Styled.CollectionMenuButton>
				))}
			</Styled.CollectionMenu>
		</Styled.CollectionMenuWrapper>
	);
};
