import { FC, useEffect } from "react";
import * as Styled from "./DraftProfile.styles";
import { CollectionMenu } from "./CollectionMenu/CollectionMenu";
import { CollectionItems } from "./CollectionItems/CollectionItems";
import { useParams } from "react-router";
import { SelectedItems } from "./SelectedItems/SelectedItems";
import { ArtistList } from "./ArtistList/ArtistList";
import { Header } from "./Header/Header";
import useVotingDataStore from "../../dataStores/useCollections";
import { ProgressBar } from "../Shared/ProgressBar";
import { AudioPlayer } from "./CollectionItems/AudioPlayer";

export const DraftProfile: FC = () => {
	const draftId = useParams().id;
	const { draftDataHydration } = useVotingDataStore();

	useEffect(() => {
		if (draftId) draftDataHydration(draftId);
	}, [draftDataHydration, draftId]);

	return (
		<>
			<Styled.DraftProfileWrapper>
				<ProgressBar />
				<Header />

				<Styled.DraftProfileContentWrapper>
					<ArtistList />

					<CollectionMenu />

					<CollectionItems />

					<SelectedItems />
				</Styled.DraftProfileContentWrapper>
			</Styled.DraftProfileWrapper>
			<AudioPlayer />
		</>
	);
};
