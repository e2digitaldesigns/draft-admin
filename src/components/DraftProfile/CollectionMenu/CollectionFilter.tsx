import React from "react";
import * as Styled from "./CollectionFilter.styles";
import useVotingDataStore from "../../../dataStores/useCollections";
import { MediaTypes } from "../../../types";

export const CollectionFilter: React.FC = () => {
	const { collectionFilter, setCollectionFilter } = useVotingDataStore();

	return (
		<Styled.CollectionFilterWrapper>
			{Object.values(MediaTypes).map((filter: MediaTypes) => (
				<Styled.FilterButton
					key={filter}
					$isSelected={filter === collectionFilter}
					onClick={() => setCollectionFilter(filter)}
				>
					{filter}s
				</Styled.FilterButton>
			))}
		</Styled.CollectionFilterWrapper>
	);
};
