import React from 'react';
import {
	useTable,
	Column,
	HeaderGroup,
	Row,
	Cell,
	useSortBy,
} from 'react-table';
import { Inspection } from './types';


interface IProps {
	data: any[];
	columns: any[];
}

const Table: React.FC<IProps> = ({ data, columns }) => {
	const {
		getTableBodyProps,
		getTableProps,
		headerGroups,
		rows,
		prepareRow,
		// @ts-ignore
	} = useTable({ columns, data }, useSortBy);

	return (
		<table {...getTableProps()} className="table">
			<thead className="table-header-group">
				{headerGroups.map((headerGroup: any) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column: any) => (
							<th
								{...column.getHeaderProps(column.getSortByToggleProps())}
								className="border-2 border-blue-400 bg-gray-300 px-2"
							>
								{column.render('Header')}

								{column.isSorted ? (column.isSortedDesc ? '\n🔽' : '\n🔼') : ''}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row: any) => {
					prepareRow(row);
					return (
						<tr
							{...row.getRowProps()}
							className="border-t-2 border-blue-400 last:border-b-2 border-r-2 border-l-2 odd:bg-gray-100"
						>
							{row.cells.map((cell: Cell<Inspection, any>) => (
								<td
									{...cell.getCellProps()}
									className="border-r-2 border-blue-400 text-center p-2"
								>
									{cell.render('Cell')}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
