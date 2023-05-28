import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import DadosTeste from '../../DadosTeste';

const nodes = DadosTeste.slice(0, 10);

const StoriesTheme = () => {
  const data = { nodes };

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #eaf5fd;
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
      HeaderCell: `
      padding-right: 6px;

      & > div {
        display: flex;
        justify-content: space-between;
      }
    `,
      Row: `
        &:nth-of-type(odd) {
          background-color: white;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
      BaseCell: `
      &:not(:last-of-type) {
        border-right: 1px solid #a0a8ae;
      }

      text-align: left;

      &:first-of-type {
        text-align: right;
      }

      // &:last-of-type {
      //   text-align: right;
      // }

      // margin: 9px;
      padding: 11px;
      `,
    },
  ]);

  const COLUMNS = [
    { label: 'ordem'.toUpperCase(), renderCell: (item) => item.ordem },
    { label: 'rastreamento'.toUpperCase(), renderCell: (item) => item.rastreamento },
    { label: 'destinatario'.toUpperCase(), renderCell: (item) => item.destinatario },
    { label: 'endereco'.toUpperCase(), renderCell: (item) => item.endereco },
    { label: 'num_endereco'.toUpperCase(), renderCell: (item) => item.num_endereco },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
    </>
  );
};

export default StoriesTheme;