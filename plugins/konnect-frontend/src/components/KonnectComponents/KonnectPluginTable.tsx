import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableColumn,
} from '@backstage/core-components';


export const KonnectPluginTable = ({ data: { data } }: { data: any }) => {

  const generatedData = data?.map(item => {
    console.log(item);
    return {
      created_at: new Date(item.created_at * 1000),
      updated_at: new Date(item.updated_at * 1000),
      id: item.instance_name,
      name: item.name,
      enabled: item.enabled,
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
      title: 'Instance Name',
      field: 'instance_name',
      highlight: true,
      type: 'string',
    },
    {
      title: 'Plugin',
      field: 'name',
      type: 'string',
    },
    {
      title: 'Enabled',
      field: 'enabled',
      type: 'boolean',
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
            title="Plugins"
          />
        </div>
      ) : null}
    </>
  );

}