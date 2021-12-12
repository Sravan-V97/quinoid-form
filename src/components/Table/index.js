import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    width: "100%",
    height: "100%",
  },
  paperRoot: {
    width: "100%",
  },
  tableContainer: {
    maxHeight: 500,
    [theme.breakpoints.up(1050)]: {
      "&::-webkit-scrollbar": {
        width: "12px",
      },
      "&::-webkit-scrollbar-thumb": {
        border: "4px solid rgba(0, 0, 0, 0)",
        backgroundClip: "padding-box",
        borderRadius: "8px",
        backgroundColor: "#AAAAAA",
      },
    },
    "& .MuiTableCell-head": {
      fontWeight: 600,
    },
  },
  flagImg: {
    width: "80px",
  },
}));

const TableData = ({ rows, columns }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.rootContainer}>
      <Paper className={classes.paperRoot}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        const isFlag = _.isEqual(column?.id, "flags");
                        const isMap = _.isEqual(column?.id, "maps");
                        const isPopulation = _.isEqual(
                          column?.id,
                          "population"
                        );
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {isFlag ? (
                              <img
                                src={value}
                                alt="flag"
                                className={classes.flagImg}
                              />
                            ) : isMap ? (
                              // eslint-disable-next-line react/jsx-no-target-blank
                              <a href={value} target="_blank">
                                {value}
                              </a>
                            ) : isPopulation ? (
                              value.toLocaleString("en-US")
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TableData;
