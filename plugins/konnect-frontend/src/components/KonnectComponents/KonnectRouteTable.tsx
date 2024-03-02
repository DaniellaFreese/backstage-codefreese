import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import {
  Table,
  TableColumn,
} from '@backstage/core-components';
import { Route } from '../../types';


export const KonnectRouteTable = ({ data: { data } }: { data: any }) => {

  const generatedData = data?.map(item => {
    console.log(item);
    return {
      created_at: new Date(item.created_at * 1000),
      updated_at: new Date(item.updated_at * 1000),
      protocols: item.protocols?.join(', '),
      methods: item.methods?.join(', '),
      paths: item.paths?.join(', '),
      id: item.id,
      name: item.name,
    }
  }); 

  const useStyles = makeStyles(theme => ({
    container: {
      width: 850,
    },
    empty: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();
  const columns: TableColumn[] = [
    {
      title: 'Name',
      field: 'name',
      highlight: true,
      type: 'string',
    },
    {
      title: 'Protocols',
      field: 'protocols',
      type: 'string',
    },
    {
      title: 'Hosts',
      field: 'hosts',
      type: 'string',
    },
    {
      title: 'Methods',
      field: 'methods',
      type: 'string',
    },
    {
      title: 'Paths',
      field: 'paths',
      type: 'string',
    },
    {
      title: 'Created At',
      field: 'created_at',
      type: 'date',
    },
    {
      title: 'Updated At',
      field: 'updated_at',
      type: 'date',
    },
  ];

  return (
    <>
      {data ? (
        <div className={classes.container}>
          <Table
            options={{ paging: true }}
            data={generatedData}
            columns={columns}
            title="Routes"
          />
        </div>
      ) : null}
    </>
  );

};