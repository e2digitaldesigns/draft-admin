import { create, StoreApi } from "zustand";
import { persist } from "zustand/middleware";

export interface ICollectionStore {
	draftSession: string;
}

const useVotingDataStore = create(
	persist<ICollectionStore>(
		(set: StoreApi<ICollectionStore>["setState"], get: StoreApi<ICollectionStore>["getState"]) => {
			return {
				draftSession: "ss"
			};
		},
		{
			name: "STORAGE_KEY.VOTING_USER_VOTING"
		}
	)
);

export default useVotingDataStore;
