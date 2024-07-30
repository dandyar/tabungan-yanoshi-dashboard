import * as React from "react";
import {
  Card,
  CardBody,
  TableContainer,
  Table,
  Thead,
  Tbody,
  TableCaption,
  Tr,
  Th,
  Td
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

const MemberDataTable = ({ data, onShowDetail  }) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("nama_lengkap", {
      cell: (info) => info.getValue(),
      header: "Nama Lengkap",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "Status"
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card w='100%'>
      <CardBody>
        <TableContainer>
          <Table variant="simple">
          <TableCaption placement='top' mt={0}>Pilih untuk melihat detail member</TableCaption>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                    const meta = header.column.columnDef.meta;
                    return (
                      <Th key={header.id} isNumeric={meta?.isNumeric}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id} onClick={() => onShowDetail(row)}>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta;
                    return (
                      <Td key={cell.id} isNumeric={meta?.isNumeric}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default MemberDataTable;
