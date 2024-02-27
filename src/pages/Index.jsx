import React, { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, IconButton } from "@chakra-ui/react";
import { FaPlus, FaTable, FaPlusSquare, FaMinusSquare } from "react-icons/fa";

const Index = () => {
  const [tables, setTables] = useState([]);

  const addTable = () => {
    setTables([...tables, { rows: 1, columns: 1, data: { "0-0": "" } }]);
  };

  const addRow = (tableIndex) => {
    const newTables = [...tables];
    const table = newTables[tableIndex];
    table.rows += 1;
    setTables(newTables);
  };

  const addColumn = (tableIndex) => {
    const newTables = [...tables];
    const table = newTables[tableIndex];
    table.columns += 1;
    setTables(newTables);
  };

  const updateCell = (tableIndex, rowIndex, colIndex, value) => {
    const newTables = [...tables];
    const table = newTables[tableIndex];
    if (value.startsWith("=")) {
      const cellRef = value.slice(1).split("-");
      const refRowIndex = parseInt(cellRef[0], 10);
      const refColIndex = parseInt(cellRef[1], 10);
      value = table.data[`${refRowIndex}-${refColIndex}`] || "";
    }
    table.data[`${rowIndex}-${colIndex}`] = value;
    setTables(newTables);
  };

  const renderTable = (table, tableIndex) => {
    return (
      <Box key={tableIndex} mb="6">
        <Table variant="simple">
          <Thead>
            <Tr>
              {Array.from({ length: table.columns }).map((_, colIndex) => (
                <Th key={colIndex}>{String.fromCharCode(65 + colIndex)}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: table.rows }).map((_, rowIndex) => (
              <Tr key={rowIndex}>
                {Array.from({ length: table.columns }).map((_, colIndex) => (
                  <Td key={colIndex}>
                    <Input value={table.data[`${rowIndex}-${colIndex}`] || ""} onChange={(e) => updateCell(tableIndex, rowIndex, colIndex, e.target.value)} />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box mt="2">
          <IconButton icon={<FaPlusSquare />} onClick={() => addRow(tableIndex)} aria-label="Add Row" mr="2" />
          <IconButton icon={<FaPlusSquare />} onClick={() => addColumn(tableIndex)} aria-label="Add Column" />
        </Box>
      </Box>
    );
  };

  return (
    <Box p="6">
      <Button leftIcon={<FaTable />} colorScheme="blue" onClick={addTable}>
        Add Table
      </Button>
      {tables.map(renderTable)}
    </Box>
  );
};

export default Index;
