import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primatives/table";
import { Input } from "@/primatives/input";
import DataTablePagination from "./DataTablePagination/DataTablePagination";
import React from "react";

/**
 * The props for the DataTable component
 * @template TData the type of data to render in the table
 * @template TValue the type of the value of the data
 */
interface DataTableProps<TData, TValue> {
  /**
   * The column definition to render in the table
   */
  columns: ColumnDef<TData, TValue>[];
  /**
   * The data to render in the table (must match the column definition)
   */
  data: TData[];
  /**
   * The column to search by (must be a string column)
   */
  searchColumn?: string;
  /**
   * The placeholder text for the search input
   */
  searchPlaceholder?: string;
  /**
   * secondary search column (must be a string column)
   */
  secondarySearchColumn?: string;
  /**
   * The placeholder text for the secondary search input
   */
  secondarySearchPlaceholder?: string;
}

/**
 * A table component that uses the react-table library to render a table with sorting, filtering, and pagination
 *
 * @param columns the column definition to render in the table
 * @param data the data to render in the table (must match the column definition)
 * @param searchColumn the column to search by (must be a string column)
 * @param searchPlaceholder the placeholder text for the search input
 * @constructor
 */
function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  searchPlaceholder,
  secondarySearchColumn,
  secondarySearchPlaceholder,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className={"flex space-x-8 "}>
        {searchColumn && (
          <div className="flex items-center py-4 w-1/3">
            <Input
              placeholder={searchPlaceholder ?? "Search by name..."}
              value={
                (table.getColumn(searchColumn)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(searchColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-lg"
            />
          </div>
        )}
        {secondarySearchColumn && (
          <div className="flex items-center py-4">
            <Input
              placeholder={secondarySearchPlaceholder ?? "Search..."}
              value={
                (table
                  .getColumn(secondarySearchColumn)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(secondarySearchColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-md"
            />
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}

export default DataTable;
