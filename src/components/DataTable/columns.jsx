import DataTableSelect from './DataTableSelect'
import DataTableColumnHeader from './DataTableColumnHeader'
import DataTableCheckBox from './DataTableCheckBox'
import SimpleDataTableColumnHeader from './SimpleDataTableColumnHeader'

import { UpdateIcon } from '@radix-ui/react-icons'
import { useBoundStore } from '../../utils/storeBinder'

export const columns =
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
                    <div className='flex space-x-2'>
                        <span className='font-medium text-sm text-neutral-600 dark:text-neutral-200 truncate max-w-[550px] px-2'>
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
                    <div className='flex max-w-[300px]'>
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
                <div className='flex ml-2 mr-2 max-w-[500px]'>
                    <DataTableSelect
                        // options={}
                        row={row}
                        defaultValue={'Import'}
                        onSelect={(value) => console.log(value)}

                        // checked={row.getIsSelected()}
                        // onCheckedChange={(value) => row.toggleSelected(!!value)}
                    />
                </div>
            )
        },
    ]

