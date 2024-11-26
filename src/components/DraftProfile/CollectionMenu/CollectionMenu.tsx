import { FC } from "react";
import * as Styled from "./CollectionMenu.styles";
import { Collection, DataCollectionItem } from "../../../types";

interface CollectionMenuProps {
	collections: Collection[];
	filterAvailableSongs: DataCollectionItem[];
	handleFetchCollectionItems: (collection: Collection) => void;
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
				{collections.map((collection: Collection) => (
					<Styled.CollectionMenuButton
						key={collection.collectionId}
						onClick={() => handleFetchCollectionItems(collection)}
					>
						<img src={collection.collectionCover} alt={collection.collectionTitle} />
					</Styled.CollectionMenuButton>
				))}
			</Styled.CollectionMenu>
		</Styled.CollectionMenuWrapper>
	);
};
