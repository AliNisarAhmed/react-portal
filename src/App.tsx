import React, { useEffect, useState, useMemo } from 'react';
import { getInspections } from './api';
import { Inspection } from './types';
import {
	useTable,
	Column,
	HeaderGroup,
	Row,
	Cell,
	useSortBy,
} from 'react-table';
import './tailwind.output.css';

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

	const {
		getTableBodyProps,
		getTableProps,
		headerGroups,
		rows,
		prepareRow,
		// @ts-ignore
	} = useTable({ columns, data: inspections }, useSortBy);

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}

	return (
		<div className="p-10 container mx-auto">
			<table {...getTableProps()} className="mx-auto table">
				<thead className="table-header-group">
					{headerGroups.map((headerGroup: any) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className="border-2 border-blue-400 bg-gray-300"
								>
									{column.render('Header')}

									{column.isSorted
										? column.isSortedDesc
											? ' 🔽'
											: ' 🔼'
										: ''}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row: Row<Inspection>) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								className="border-t last:border-b bg-red odd:bg-gray table-row"
							>
								{row.cells.map((cell: Cell<Inspection, any>) => (
									<td
										{...cell.getCellProps()}
										className="border-t bg-red odd:bg-gray table-cell py-2 px-4"
									>
										{cell.render('Cell')}
									</td>
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
