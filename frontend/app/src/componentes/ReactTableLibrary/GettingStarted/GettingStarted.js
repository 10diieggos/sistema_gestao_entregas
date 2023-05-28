import { CompactTable } from '@table-library/react-table-library/compact';
import DadosTeste from '../../DadosTeste';

const nodes = DadosTeste.slice(0, 10);

const COLUMNS = [
  { label: 'ordem'.toUpperCase(), renderCell: (item) => item.ordem },
  { label: 'rastreamento'.toUpperCase(), renderCell: (item) => item.rastreamento },
  { label: 'destinatario'.toUpperCase(), renderCell: (item) => item.destinatario },
  { label: 'endereco'.toUpperCase(), renderCell: (item) => item.endereco },
  { label: 'num_endereco'.toUpperCase(), renderCell: (item) => item.num_endereco },
];

export const GettingStarted = () => {
  const data = { nodes };
  console.log(data)
  return <CompactTable columns={COLUMNS} data={data} />;
};