/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import * as Styled from "./ArtistList.styles";

interface ArtistListProps {
	artistList: any[];
	handleArtistCollections: any;
}

export const ArtistList: React.FC<ArtistListProps> = ({ artistList, handleArtistCollections }) => {
	return (
		<Styled.ArtistWrapper>
			{artistList.map((artist: any) => (
				<Styled.ArtistImageWrapper
					key={artist.id}
					onClick={() => handleArtistCollections(artist.id)}
				>
					<img src={artist.picture_small} alt={artist.name} />
				</Styled.ArtistImageWrapper>
			))}
		</Styled.ArtistWrapper>
	);
};
