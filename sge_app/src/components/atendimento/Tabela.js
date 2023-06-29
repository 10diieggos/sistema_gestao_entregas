import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useFilters } from 'react-table';
import moment from 'moment';
import './Tabela.css';
import ColumnHeader from './ColumnHeader.js';

function Tabela() {
  const api_host = process.env.REACT_APP_API_HOST;
  const [data, setData] = useState([]);
  useEffect(() => {
    const options = { method: 'GET', url: `http://${api_host}/atendimento` };
    axios.request(options).then(function (response) {
      setData(response.data.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [api_host]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rastreamento',
        accessor: 'codigo',
        Cell: ({ value }) => {
          return <div className="coluna-rastreamento">{value}</div>;
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.codigo === null) return desc ? -1 : 1;
          if (rowB.original.codigo === null) return desc ? 1 : -1;
          return rowA.original.codigo.localeCompare(rowB.original.codigo);
        },
      },
      {
        Header: 'Ordem',
        accessor: 'ordem',
        Cell: ({ value }) => {
          return <div className="coluna-ordem">{value}</div>;
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.ordem === null) return desc ? -1 : 1;
          if (rowB.original.ordem === null) return desc ? 1 : -1;
          return rowA.original.ordem - rowB.original.ordem;
        },
      },
      {
        Header: 'Lista',
        accessor: 'lista',
        Cell: ({ value }) => {
          return <div  className="coluna-lista">{value}</div>;
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.lista === null) return desc ? -1 : 1;
          if (rowB.original.lista === null) return desc ? 1 : -1;
          return rowA.original.lista - rowB.original.lista;
        },
      },
      {
        Header: 'Item',
        accessor: 'posicao_objeto',
        Cell: ({ value }) => {
          return <div  className="coluna-item">{value}</div>;
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.posicao_objeto === null) return desc ? -1 : 1;
          if (rowB.original.posicao_objeto === null) return desc ? 1 : -1;
          return rowA.original.posicao_objeto - rowB.original.posicao_objeto;
        },
      },
      {
        Header: 'Situação',
        accessor: 'situacao',
        Cell: ({ value }) => {
          return <div style={{ textAlign: 'center' }}>{value}</div>;
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.situacao === null) return desc ? -1 : 1;
          if (rowB.original.situacao === null) return desc ? 1 : -1;
          return rowA.original.situacao.localeCompare(rowB.original.situacao);
        },
      },
      {
        Header: 'Destinatário',
        accessor: 'destinatario',
        Cell: ({ value, row }) => {
          const inputRef = useRef(null);
          const measureRef = useRef(null);
      
          useEffect(() => {
            if (inputRef.current && measureRef.current) {
              inputRef.current.style.width = `${measureRef.current.offsetWidth + 2}px`;
            }
          }, [value]);
      
          return (
            <>
              <input
                ref={inputRef}
                className="input-de-celulas"
                style={{ textAlign: 'left' }}
                value={value}
                onChange={event => {
                  const novoValor = event.target.value;
                  setData(prevData => {
                    // Cria uma cópia do array de dados
                    const newData = [...prevData];
                    // Atualiza o objeto na linha atual
                    newData[row.index] = {
                      ...newData[row.index],
                      destinatario: novoValor,
                    };
                    return newData;
                  });
                }}
              />
              <span
                style={{
                  visibility: 'hidden',
                  whiteSpace: 'pre',
                  position: 'absolute',
                }}
                ref={measureRef}
              >
                {value}
              </span>
            </>
          );
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.destinatario === null) return desc ? -1 : 1;
          if (rowB.original.destinatario === null) return desc ? 1 : -1;
          return rowA.original.destinatario.localeCompare(rowB.original.destinatario);
        },
      },
      {
        Header: 'Endereço',
        accessor: 'endereco',
        Cell: ({ value, row }) => {
          const inputRef = useRef(null);
          const measureRef = useRef(null);
      
          useEffect(() => {
            if (inputRef.current && measureRef.current) {
              inputRef.current.style.width = `${measureRef.current.offsetWidth + 2}px`;
            }
          }, [value]);
      
          return (
            <>
              <input
                ref={inputRef}
                className="input-de-celulas"
                style={{ textAlign: 'left' }}
                value={value}
                onChange={event => {
                  const novoValor = event.target.value;
                  setData(prevData => {
                    // Cria uma cópia do array de dados
                    const newData = [...prevData];
                    // Atualiza o objeto na linha atual
                    newData[row.index] = {
                      ...newData[row.index],
                      endereco: novoValor,
                    };
                    return newData;
                  });
                }}
              />
              <span
                style={{
                  visibility: 'hidden',
                  whiteSpace: 'pre',
                  position: 'absolute',
                }}
                ref={measureRef}
              >
                {value}
              </span>
            </>
          );
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.endereco === null) return desc ? -1 : 1;
          if (rowB.original.endereco === null) return desc ? 1 : -1;
          return rowA.original.endereco.localeCompare(rowB.original.endereco);
        },
      },
      {
        Header: 'Número',
        accessor: 'num_endereco',
        Cell: ({ value, row }) => {
          const inputRef = useRef(null);
          const measureRef = useRef(null);
      
          useEffect(() => {
            if (inputRef.current && measureRef.current) {
              inputRef.current.style.width = `${measureRef.current.offsetWidth + 2}px`;
            }
          }, [value]);
      
          return (
            <>
              <input
                ref={inputRef}
                className="input-de-celulas"
                style={{ textAlign: 'left' }}
                value={value}
                onChange={event => {
                  const novoValor = event.target.value;
                  setData(prevData => {
                    // Cria uma cópia do array de dados
                    const newData = [...prevData];
                    // Atualiza o objeto na linha atual
                    newData[row.index] = {
                      ...newData[row.index],
                      num_endereco: novoValor,
                    };
                    return newData;
                  });
                }}
              />
              <span
                style={{
                  visibility: 'hidden',
                  whiteSpace: 'pre',
                  position: 'absolute',
                }}
                ref={measureRef}
              >
                {value}
              </span>
            </>
          );
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.num_endereco === null) return desc ? -1 : 1;
          if (rowB.original.num_endereco === null) return desc ? 1 : -1;
          return rowA.original.endereco.localeCompare(rowB.original.endereco);
        },
      },
      {
        Header: 'Data Evento',
        accessor: 'data_hora',
        Cell: ({ value }) => {
          return moment(value).format('DD/MM/YYYY HH:mm:ss');
        },
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.data_hora === null) return desc ? -1 : 1;
          if (rowB.original.data_hora === null) return desc ? 1 : -1;
          return rowA.original.data_hora.localeCompare(rowB.original.data_hora);
        },
      },
      {
        Header: 'Local',
        accessor: 'local',
        sortType: (rowA, rowB, columnId, desc) => {
          if (rowA.original.local === null) return desc ? -1 : 1;
          if (rowB.original.local === null) return desc ? 1 : -1;
          return rowA.original.local.localeCompare(rowB.original.local);
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setAllFilters,
  } = tableInstance;

  return (
      <table {...getTableProps()}>
        <caption   style={{
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: 'white',
                    }}>
            ATENDIMENTO
      </caption>

      <thead>
        <tr>
          <th colSpan={columns.length}>
            <button onClick={() => setAllFilters([])}>Limpar Filtros</button>
            {/* Adicione outros botões aqui */}
          </th>
        </tr>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <ColumnHeader column={column} headerGroup={headerGroup} />
            ))}
          </tr>
        ))}
      </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
  );
}

export default Tabela