import { useState, useMemo, useRef } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    UpdateIcon
} from '@radix-ui/react-icons'

import Select from '../Settings/Select'
import DataTableSelect from './DataTableSelect'
import DataTableColumnHeader from './DataTableColumnHeader'
import DataTableCheckBox from './DataTableCheckBox'
import SimpleDataTableColumnHeader from './SimpleDataTableColumnHeader'

import { useBoundStore } from '../../utils/storeBinder'

export default function Table() {
    const { 
        parsedBookmarks, 
        bookmarks 
    } = useBoundStore((state) => ({ 
        parsedBookmarks: state.parsedBookmarks, 
        bookmarks: state.bookmarks 
    }))
    const selectOptions = Object.keys(bookmarks)
    
    const columns = useMemo(() =>
        [
            {
                id: 'select',
                header: ({ table }) => (
                    <DataTableCheckBox
                        checked={table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    />
                ),
                cell: ({ row }) => (
                    <div className='flex w-[40px] ml-2'>
                        <DataTableCheckBox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                        />
                    </div>

                ),
            },
            {
                accessorKey: 'icon',
                id: 'icon',

                header: () => <UpdateIcon />,
                cell: info => (
                    <div className='flex w-[40px] ml-2'>
                        <img
                            src={info.row.original.icon}
                        />
                    </div>
                ),
                footer: props => props.column.id,
            },
            {
                accessorKey: 'url',
                id: 'url',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title='URL' />
                ),
                cell: ({ row }) => {
                    return (
                        <div className='flex w-full'>
                            <span className='font-medium truncate w-[550px] max-w-[550px] text-sm text-neutral-600 dark:text-neutral-200 px-2'>
                                {row.getValue('url')}
                            </span>
                        </div>
                    )
                },
                footer: props => props.column.id,
            },
            {
                accessorKey: 'title',
                id: 'title',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title='Title' />
                ),
                cell: ({ row }) => {
                    return (
                        <div className='flex w-[300px]'>
                            <span className='text-neutral-500 text-sm truncate pl-2'>
                                {row.getValue("title")}
                            </span>
                        </div>
                    )
                },
                footer: props => props.column.id,
            },
            {
                id: 'actions',
                header: () => (
                    <SimpleDataTableColumnHeader
                        title='Category'
                    />
                ),
                cell: ({ row }) => (
                    <div className='flex ml-2 mr-2'>
                        <DataTableSelect
                            row={row}
                            onSelect={(value) => console.log(value)}
                            options={['Imports', ...selectOptions]}
                        />
                    </div>
                ),
            },
        ], [])
    const data = parsedBookmarks ?? []
    return (
        <MyTable
            {...{
                data,
                columns
            }}
        />
    )
}

function MyTable({ data, columns }) {
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 10
    })

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        state: { pagination },
    })

    return (
        <div className='w-full h-full rounded-md border border-neutral-200 dark:border-neutral-800 my-3'>
            <table>
                {/* column name headers */}
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className='rounded-t border-b border-neutral-200 dark:border-neutral-800 transition-colors dark:hover:bg-neutral-900 hover:bg-neutral-100'
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className='py-1 text-xs font-semibold text-neutral-400 text-left px-2'
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}

                </thead>
                {/* table row body */}
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr
                                key={row.id}
                                className={`dark:hover:bg-neutral-800 hover:bg-neutral-100 transition-colors ${row.getIsSelected() ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className=' py-2'
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* pagination navigation and information*/}
            <div className='flex gap-2 justify-end my-4 mx-2'>
                <div className='flex items-center flex-row w-full justify-between'>
                    <div className='text-sm font-medium text-neutral-800 dark:text-neutral-200'>
                        {table.getFilteredSelectedRowModel().rows.length} of {''}
                        {table.getFilteredRowModel().rows.length} row(s) selected
                    </div>

                    {/* Right Wrapper */}
                    <div className='flex items-center'>
                        {/* Select */}
                        <div className='text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center'>
                            <p className='mr-2'>Rows per page </p>
                            <Select
                                obj={[10, 20, 30, 40, 50]}
                                defaultValue={table.getState().pagination.pageSize}
                                handler={(number) => table.setPageSize(Number(number))}
                                styling='w-full md:w-16'
                            />
                        </div>
                        {/* Buttons */}
                        <p className='text-sm font-medium mx-4 text-neutral-800 dark:text-neutral-200'>Page {table.getState().pagination.pageIndex + 1} of {' '}
                            {table.getPageCount().toLocaleString()}
                        </p>
                        <div className='flex gap-2 justify-end'>
                            <button
                                className='border shadow-sm text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 rounded p-1.5 disabled:opacity-50'
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <DoubleArrowLeftIcon />
                            </button>
                            <button
                                className='border shadow-sm text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 rounded p-1.5 disabled:opacity-50'
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeftIcon />
                            </button>
                            <button
                                className='border shadow-sm text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 rounded p-1.5 disabled:opacity-50'
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRightIcon />
                            </button>
                            <button
                                className='border shadow-sm text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 rounded p-1.5 disabled:opacity-50'
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <DoubleArrowRightIcon />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}