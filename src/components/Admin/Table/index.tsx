import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./styles.module.scss";

function createData(name: string, presenca: string, fat: number) {
  return { name, presenca, fat };
}

const rows = [
  createData("Frozen yoghurt", "SIM", 6.0),
  createData("Ice cream sandwich", "SIM", 9.0),
  createData("Eclair", "SIM", 16.0),
  createData("Cupcake", "SIM", 3.7),
  createData("Gingerbread", "SIM", 16.0),
];

export default function TableUsers() {
  return (
    <div className={styles.tableContainer}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.header}>
            <TableRow>
              <TableCell>Convidado</TableCell>
              <TableCell align="left">Confirma presença</TableCell>
              <TableCell align="left">Acompanhantes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.presenca}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
