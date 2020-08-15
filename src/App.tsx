import React, { useEffect, useState, useMemo } from 'react';
import { getInspections } from './api';
import { Inspection } from './types';
import { useTable, Column, HeaderGroup, Row, Cell } from 'react-table';

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
			{
				Header: 'Id',
				accessor: 'id',
			},
			{
				Header: 'Customer Information',
				columns: [
					{ Header: 'Customer Name', accessor: 'customerName' },
					{ Header: 'Customer Email', accessor: 'customerEmail' },
				],
			},
			{
				Header: 'Reference #',
				accessor: 'referenceNo.value',
			},
			{
				Header: 'User',
				id: 'user',
				accessor: (row: Inspection) =>
					row.user!.firstName + ' ' + row.user!.lastName,
			},
			{
				Header: 'Location',
				accessor: 'location.name',
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
		[]
	);

	const {
		getTableBodyProps,
		getTableProps,
		headerGroups,
		rows,
		prepareRow,
		// @ts-ignore
	} = useTable({ columns, data: inspections });

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}

	return (
		<div className="App">
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup: HeaderGroup<Inspection>) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: HeaderGroup<Inspection>) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row: Row<Inspection>) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell: Cell<Inspection, any>) => (
									<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default App;
