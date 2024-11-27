import { FC, useEffect } from "react";
import * as Styled from "./DraftProfile.styles";
import { CollectionMenu } from "./CollectionMenu/CollectionMenu";
import { CollectionItems } from "./CollectionItems/CollectionItems";
import { useParams } from "react-router";
import httpService from "../../Api/httpService";
import { SelectedItems } from "./SelectedItems/SelectedItems";
import { ArtistList } from "./ArtistList/ArtistList";
import { Header } from "./Header/Header";
import { DataCollectionItem } from "../../types";
import useVotingDataStore from "../../dataStores/useCollections";

export const DraftProfile: FC = () => {
	const draftId = useParams().id;

	const { draftDataHydration } = useVotingDataStore();

	// fetch draft data
	useEffect(() => {
		if (!draftId) return;

		const fecthData = async () => {
			const { data } = await httpService.get(`/draft-admin/${draftId}`);
			draftDataHydration(data.result);
		};

		fecthData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////

	const handleCollectionAddItems = async (item: DataCollectionItem) => {
		if (!draftId) return;
		const { data } = await httpService.patch(`draft-admin/${draftId}`, {
			...item
		});

		console.log(data.resultStatus.success);
	};

	const handleCollectionRemoveItems = async (itemId: string) => {
		if (!draftId) return;
		const { data } = await httpService.delete(`draft-admin/${draftId}/${itemId}`);

		console.log(data.resultStatus.success);
	};

	return (
		<Styled.DraftProfileWrapper>
			<Header />

			<Styled.DraftProfileContentWrapper>
				<ArtistList />

				<CollectionMenu />

				<CollectionItems
					handleCollectionAddItems={handleCollectionAddItems}
					handleCollectionRemoveItems={handleCollectionRemoveItems}
				/>

				<SelectedItems handleCollectionRemoveItems={handleCollectionRemoveItems} />
			</Styled.DraftProfileContentWrapper>
		</Styled.DraftProfileWrapper>
	);
};
