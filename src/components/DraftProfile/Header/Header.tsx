import React, { useEffect } from "react";
import { Search } from "react-feather";

import * as Styled from "./Header.styles";
import useVotingDataStore from "../../../dataStores/useCollections";
import { useFetchArtist } from "../../../Api";

export const Header: React.FC = () => {
	const { setSelectedSearchTerm, selectedSearchTerm, setArtistList, searchTerm, setSearchTerm } =
		useVotingDataStore();

	const { data: artistData, isPending: artistIsPending } = useFetchArtist(selectedSearchTerm);

	useEffect(() => {
		if (!artistData || artistIsPending) return;

		setArtistList(artistData);
	}, [artistIsPending, artistData, setArtistList]);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setSelectedSearchTerm();
		}
	};

	return (
		<Styled.HeaderWrapper>
			<Styled.SearchWrapper>
				<div>
					<Search />
				</div>
				<input
					aria-label="Search for artists"
					type="text"
					placeholder="Search for artists"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
			</Styled.SearchWrapper>
		</Styled.HeaderWrapper>
	);
};
