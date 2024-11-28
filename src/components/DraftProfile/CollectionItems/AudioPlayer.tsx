import React, { useEffect, useRef } from "react";
import useVotingDataStore from "../../../dataStores/useCollections";

export const AudioPlayer: React.FC = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const { audioFile, setAudioProgress, setAudioPlayerState, audioPlayerState } =
		useVotingDataStore();

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const updateProgress = () => {
			if (!audio) return;
			setAudioProgress((audio.currentTime / audio.duration) * 100);
			setAudioPlayerState("playing");
		};

		audio.addEventListener("timeupdate", updateProgress);

		return () => {
			audio.removeEventListener("timeupdate", updateProgress);
		};
	}, [setAudioProgress, setAudioPlayerState]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.addEventListener("ended", () => {
			setAudioProgress(0);
			setAudioPlayerState("stopped");
		});

		return () => {
			audio.removeEventListener("ended", () => {
				setAudioProgress(0);
				setAudioPlayerState("stopped");
			});
		};
	}, [setAudioProgress, setAudioPlayerState]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (audioFile?.file) {
			setAudioProgress(0);
			audio.currentTime = 0;
			audio.src = audioFile.file;
			audio.play();
		}
	}, [audioFile, setAudioProgress]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || audioPlayerState !== "stopped") return;
		audio.pause();
	}, [audioPlayerState]);

	return (
		<>
			<audio
				ref={audioRef}
				style={{
					pointerEvents: "none",
					position: "absolute",
					top: 0,
					opacity: 0.1,
					height: 0,
					width: 0
				}}
			>
				<source
					src="https://cdn-preview-e.dzcdn.net/stream/c-e8a4e777b101840ac04160409fac3296-5.mp3"
					type="audio/mpeg"
				/>
			</audio>
		</>
	);
};
