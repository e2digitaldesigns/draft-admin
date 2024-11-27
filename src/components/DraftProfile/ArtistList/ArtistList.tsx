/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import * as Styled from "./ArtistList.styles";
import useVotingDataStore from "../../../dataStores/useCollections";

export const ArtistList: React.FC = () => {
	const { artistList, setSelectedArtistId } = useVotingDataStore();
	return (
		<Styled.ArtistWrapper>
			{artistList.map((artist: any) => (
				<Styled.ArtistImageWrapper key={artist.id} onClick={() => setSelectedArtistId(artist.id)}>
					<img src={artist.picture_small} alt={artist.name} />
				</Styled.ArtistImageWrapper>
			))}
		</Styled.ArtistWrapper>
	);
};
