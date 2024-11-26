import React from "react";
import { Search } from "react-feather";

import * as Styled from "./Header.styles";

interface HeaderProps {
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	handleSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
	// call handle search function when user presses enter
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
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
					onKeyPress={handleKeyPress}
				/>
			</Styled.SearchWrapper>
		</Styled.HeaderWrapper>
	);
};
