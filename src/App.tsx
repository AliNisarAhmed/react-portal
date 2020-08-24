import React, { useEffect, useState, useMemo } from 'react';
import { getInspections } from './api';
import { Inspection } from './types';

import './tailwind.output.css';
import Table from './Table';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const [inspections, setInspections] = useState<Inspection[]>([]);

	useEffect(() => {
		fetchData();

		async function fetchData() {
			const data = await getInspections();
			console.log('data :>> ', data);
			setInspections(data);
			setLoading(false);
		}
	}, []);

	const columns = useMemo(
		() => [
			{ Header: '#', id: 'rowNumber', accessor: (_: any, i: number) => i },

			{
				Header: 'Customer Information',
				columns: [
					{ Header: 'Customer Name', accessor: 'customerName' },
					{ Header: 'Customer Email', accessor: 'customerEmail' },
				],
			},
			{
				Header: 'User Information',
				columns: [
					{
						Header: 'User',
						id: 'user',
						accessor: (row: Inspection) =>
							row.user!.firstName + ' ' + row.user!.lastName,
					},
				],
			},
			{
				Header: 'Inspection Information',
				columns: [
					{
						Header: 'Inspection Id',
						accessor: 'id',
					},
					{
						Header: 'Location',
						accessor: 'location.name',
					},
					{
						Header: 'Reference #',
						accessor: 'referenceNo.value',
					},
					{
						Header: 'Type',
						accessor: 'type',
					},
					{
						Header: 'Created At',
						id: 'createdAt',
						accessor: (row: any) => new Date(row.createdAt).toLocaleString(),
					},
				],
			},
		],
		[]
	);

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}

	return (
		<div className="p-10 container mx-auto">
			<Table data={inspections} columns={columns} />
		</div>
	);
}

export default App;
