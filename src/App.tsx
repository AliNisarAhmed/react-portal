import React, { useEffect, useState, useMemo } from 'react';
import { getInspections } from './api';
import { Inspection } from './types';
import { useQuery } from 'react-query';

import './tailwind.output.css';
import Table from './Table';
import { ReactQueryDevtools } from 'react-query-devtools';

// For TS Support https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table#example-type-file

function App() {
	const { data: inspections, isLoading, isError } = useQuery(
		'getInspections',
		getInspections
	);

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

	if (isLoading) {
		return (
			<div className="container">
				<h2 className="mx-auto text-center text-2xl">Loading...</h2>
			</div>
		);
	}

	if (isError) {
		return (
			<div>
				<h2 className="mx-auto text-center text-2xl">An Error occurred</h2>
			</div>
		);
	}

	return (
		<>
			<div className="p-10 container mx-auto h-full">
				<Table data={inspections ?? []} columns={columns} />
			</div>
			<ReactQueryDevtools />
		</>
	);
}

export default App;
