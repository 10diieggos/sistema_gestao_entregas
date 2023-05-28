import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';


// customizar

function createData(rastreamento, destinatario, endereco, num_endereco, ordem) {
  return {
    rastreamento,
    destinatario,
    endereco,
    num_endereco,
    ordem,
  };
}

const rows = [
  createData('BH836140505BR', 'MARIA GRAZIELA OLIVEIRA LIMA', 'NOBRE', 'SN', '17050'),
  createData('BH843484271BR', 'DAVI LUCAS PEREIRA FREITAS', 'JOAO PAULO', 'SN', '17240'),
  createData('BH854330642BR', 'EDVAN FERREIRA LIMA', 'NOBRE', '159', '17449'),
  createData('BH855471519BR', 'JOSEFA MARIA JESUS', 'PEDRA DO ALBANO', 'SN', '17563'),
  createData('BH856265779BR', 'JENILZA CONCEICAO ALVES', 'SERRINHA', 'SN', '17611'),
  createData('BH857152977BR', 'JOSE JERALDO SILVA', 'BARRA DOIS RIACHOS', 'SN', '17612'),
  createData('BH858646735BR', 'MANOEL HONORATO SANTOS', 'JOSE REBELO TORRES', '189', '17931'),
  createData('BH860660798BR', 'FABIOLA SOARES DE OLIVEIRA MENEZES', 'CLIMA BOM', '1279', '18227'),
  createData('BH861873825BR', 'MARIA DAS GRACAS DA SILVA OLIVEIRA', 'ABOLICAO', '216', '18133'),
  createData('BR696757612BR', 'CICERO JOSE SANTOS JUNIOR', 'CLIMA BOM', '36', '17917'),
  createData('BR904894873BR', 'VALDICE FERREIRA DE LIMA', 'PROJETADA', 'SN', '18486'),
  createData('BR918648166BR', 'F V SILVA MODAS', 'HEROIS', '48', '18134'),
  createData('BR985923405BR', 'RIFELI JENARIO ARAUJO', 'PROJETADA', '12', '18228'),
  createData('BT961783822BR', 'ALIRIA BRITO VIEIRA', 'VIEIRA', 'SN', '17474'),
  createData('BT961783836BR', 'JOSILENE SILVA M SANTOS', 'PROJETADA', '61', '17473'),
  createData('BT961783840BR', 'JOSILENE SILVA M SANTOS', 'PROJETADA', '61', '17472'),
  createData('BT961783853BR', 'JOSILENE SILVA M SANTOS', 'PROJETADA', '61', '17471'),
  createData('BT961783867BR', 'MARIA ITAMARA SILVA MEDEIROS', 'PROJETADA', '108', '17470'),
  createData('BT961783875BR', 'MARIA ITAMARA SILVA MEDEIROS', 'PROJETADA', '108', '17469'),
  createData('BT961783884BR', 'JAIRO VIERIA CARDEAL', 'VIERIA', 'SN', '17468'),
  createData('BT961783898BR', 'JAIRO VIERIA CARDEAL', 'VIERIA', 'SN', '17467'),
  createData('BT961783907BR', 'JAIRO VIERIA CARDEAL', 'VIEIRA', 'SN', '17475'),
  createData('BT961821066BR', 'JOSE PORFIRIO NETO', 'FAZ NOVA', 'SN', '18225'),
  createData('BT975198403BR', 'SEBASTIAO PEREIRA', 'BOA VISTA', 'SN', '17583'),
  createData('FF254328639BR', 'JOSE ARNALDO SILVA', 'LAGES DOS CANJOS', 'SN', '17564'),
  createData('JP103989414BR', 'JAMISSON NERY SILVA', 'CORREIA', 'SN', '17953'),
  createData('JP104310204BR', 'RUBENS TENORIO DA SILVA', 'CORREIA', '18', '18492'),
  createData('LB857119168HK', 'MARIA JOSE PEREIRA', 'BOA VISTA', 'SN', '18400'),
  createData('LE567765485SE', 'JUCIMARA FERREIRA ROMUALDO', 'VIEIRA', '1180', '18011'),
  createData('LE568886975SE', 'MAX', 'CLIMA BOM', '866', '18424'),
  createData('LE569683271SE', 'WILAS NASCIMENTO DOS SANTOS', 'GILBERTO', '111', '18200'),
  createData('LE570366846SE', 'ANA CAROLINA DA SILVA', 'CIDADE DE DEUS', 'SN', '18411'),
  createData('LE570953118SE', 'LUANA DOS SANTOS ZEFERINO', 'CORREIA', '34', '18305'),
  createData('LE571971855SE', 'MARIA GISELMA DOS SANTOS S', 'AGRESTIM', 'SN', '18205'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// customizar
const headCells = [
  {
    id: 'ordem',
    numeric: false,
    disablePadding: false,
    label: 'Ordem',
  },
  {
    id: 'rastreamento',
    numeric: false,
    disablePadding: false,
    label: 'Rastreamento',
  },
  {
    id: 'destinatario',
    numeric: false,
    disablePadding: false,
    label: 'Destinatário',
  },
  {
    id: 'endereco',
    numeric: false,
    disablePadding: false,
    label: 'Endereço',
  },
  {
    id: 'num_endereco',
    numeric: false,
    disablePadding: false,
    label: 'Número',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  // stickyHeader
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          ATENDIMENTO
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// customizar
export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('destinatario');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.rastreamento);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.rastreamento)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.rastreamento}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.ordem}</TableCell>
                    <TableCell align="left">{row.rastreamento}</TableCell>
                    <TableCell align="left">{row.destinatario}</TableCell>
                    <TableCell align="left">{row.endereco}</TableCell>
                    <TableCell align="left">{row.num_endereco}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}