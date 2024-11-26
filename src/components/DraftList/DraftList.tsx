/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import httpService from "../../Api/httpService";
import { Link } from "react-router";

export const DraftList: FC = () => {
	const [drafts, setDrafts] = useState<any[]>([]);

	useEffect(() => {
		console.log("DraftList mounted");

		const fecthData = async () => {
			const { data } = await httpService.get("/draft-admin");
			console.log(data);
			setDrafts(data.result);
		};

		fecthData();

		return () => {
			console.log("DraftList unmounted");
		};
	}, []);

	return (
		<>
			<h1>draft list</h1>

			{drafts.map(draft => (
				<div key={draft._id}>
					<Link to={`/drafts/${draft._id}`}>
						{draft.name} - {draft.description} - {draft.gameCode}
					</Link>
				</div>
			))}
		</>
	);
};
