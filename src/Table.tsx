import React from 'react';
import {
	useTable,
	Column,
	HeaderGroup,
	Row,
	Cell,
	useSortBy,
	useFilters,
	usePagination,
	useResizeColumns,
	useFlexLayout,
} from 'react-table';
import { Inspection } from './types';

interface IProps {
	data: any[];
	columns: any[];
}

// TS Example: https://github.com/tannerlinsley/react-table/issues/1591

// TS Support: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table

// TS Example: https://codesandbox.io/s/github/ggascoigne/react-table-example?file=/src/Table/Table.tsx

const Table: React.FC<IProps> = ({ data, columns }) => {
	const defaultColumn = React.useMemo(
		() => ({
			// When using the useFlexLayout:
			minWidth: 30, // minWidth is only used as a limit for resizing
			width: 150, // width is used for both the flex-basis and flex-grow
			maxWidth: 200, // maxWidth is only used as a limit for resizing
		}),
		[]
	);

	const {
		getTableBodyProps,
		getTableProps,
		headerGroups,
		rows,
		prepareRow,
		state: { pageIndex, pageSize },
		gotoPage,
		canNextPage,
		canPreviousPage,
		previousPage,
		nextPage,
		pageOptions,
		pageCount,
		setPageSize,
		page,
	} = useTable<Inspection>(
		{ columns, data, defaultColumn },
		useSortBy,
		usePagination,
		useResizeColumns,
		useFlexLayout
	);

	return (
		<React.Fragment>
			<div {...getTableProps()} className="table h-full">
				<div className="table-header-group">
					{headerGroups.map((headerGroup: any) => (
						<div {...headerGroup.getHeaderGroupProps()} className="tr">
							{headerGroup.headers.map((column: any) => (
								<div
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className="border-2 border-blue-400 bg-gray-300 px-2"
								>
									<React.Fragment>
										{column.render('Header')}
										{/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
										{column.isSorted
											? column.isSortedDesc
												? '\n🔽'
												: '\n🔼'
											: ''}
										<div
											{...column.getResizerProps()}
											className={`resizer ${
												column.isResized ? 'isResizing' : ''
											}`}
										/>
									</React.Fragment>
								</div>
							))}
						</div>
					))}
				</div>
				<div {...getTableBodyProps()} className="tbody">
					{page.map((row: any) => {
						prepareRow(row);
						return (
							<div
								{...row.getRowProps()}
								className="border-t-2 border-blue-400 last:border-b-2 border-r-2 border-l-2 odd:bg-gray-100 hover:bg-gray-200"
							>
								{row.cells.map((cell: Cell<Inspection, any>) => (
									<div
										{...cell.getCellProps()}
										className="border-r-2 border-blue-400 text-center p-2 td"
									>
										{cell.render('Cell')}
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
			<div className="pagination flex justify-between bg-blue-600 text-black">
				<div>
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{'<<'}
					</button>{' '}
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						{'<'}
					</button>{' '}
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						{'>'}
					</button>{' '}
					<button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{'>>'}
					</button>{' '}
				</div>
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					| Go to page:{' '}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						style={{ width: '100px' }}
					/>
				</span>{' '}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</React.Fragment>
	);
};

export default Table;
