import { FC, useEffect } from "react";
import * as Styled from "./CollectionMenu.styles";
import { Collection } from "../../../types";
import useVotingDataStore from "../../../dataStores/useCollections";
import { useFetchArtistCollection } from "../../../Api";

export const CollectionMenu: FC = () => {
	const {
		collections,
		selectedArtistId,
		setCollections,
		selectedCollection,
		setSelectedCollection
	} = useVotingDataStore();

	const { data: artistCollectionData, isPending: artistCollectionIsPending } =
		useFetchArtistCollection(selectedArtistId);

	useEffect(() => {
		if (!artistCollectionData || artistCollectionIsPending) return;

		setCollections(artistCollectionData);
	}, [artistCollectionData, artistCollectionIsPending, setCollections]);

	return (
		<Styled.CollectionMenuWrapper>
			<Styled.ActiveItem>
				<img src={selectedCollection?.collectionCover} alt="profile" />
			</Styled.ActiveItem>

			<Styled.CollectionMenu>
				{collections.map((collection: Collection) => (
					<Styled.CollectionMenuButton
						key={collection.collectionId}
						onClick={() => setSelectedCollection(collection)}
					>
						<img src={collection.collectionCover} alt={collection.collectionTitle} />
					</Styled.CollectionMenuButton>
				))}
			</Styled.CollectionMenu>
		</Styled.CollectionMenuWrapper>
	);
};
