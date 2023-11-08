import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./styles.module.scss";

export default function TableUsers({ confirmedGuests }: any) {
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
            {confirmedGuests.map((guest: any, index: any) => (
              <TableRow
                key={guest.nome}
                className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {guest.nome}
                </TableCell>
                <TableCell align="left">SIM</TableCell>
                <TableCell align="left">{guest.acompanhantes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
