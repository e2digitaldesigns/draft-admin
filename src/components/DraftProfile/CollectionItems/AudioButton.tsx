import React from "react";
import { PauseCircle, PlayCircle } from "react-feather";
import useVotingDataStore from "../../../dataStores/useCollections";
import { MusicCollectionItem } from "../../../types";

interface AudioButtonProps {
	item: MusicCollectionItem;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ item }) => {
	const { setAudioFile, setAudioPlayerState, audioFile, audioPlayerState } = useVotingDataStore();

	return audioFile?.songId === item.songId && audioPlayerState === "playing" ? (
		<>
			<div onClick={() => setAudioPlayerState("stopped")}>
				<PauseCircle size={20} />
			</div>
		</>
	) : (
		<>
			<div onClick={() => setAudioFile(item.songId, item?.preview || "")}>
				<PlayCircle size={20} />
			</div>
		</>
	);
};
