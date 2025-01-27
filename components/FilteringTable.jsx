import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {
    return {
        Filter : ColumnFilter
    }
  }, [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <>
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}

                    <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔽") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  {/* <div>{column.render("Filter")}</div> */}
                  </th>
                </>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((footer) => (
                <th {...footer.getFooterProps()}>{footer.render("Footer")}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default FilteringTable;
