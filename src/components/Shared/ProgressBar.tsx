import React from "react";
import Styled from "styled-components";
import useVotingDataStore from "../../dataStores/useCollections";

export const ProgressBarWrapper = Styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.itemBgColor};
`;

export const ProgressBarInner = Styled.div<{ $progress: number }>`
  background-color: ${({ theme }) => theme.colors.primary}; 
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  transition: width 1s ease-in-out;
`;

export const ProgressBar: React.FC = () => {
	const { audioProgress } = useVotingDataStore();

	return (
		<ProgressBarWrapper>
			<ProgressBarInner $progress={audioProgress} />
		</ProgressBarWrapper>
	);
};
