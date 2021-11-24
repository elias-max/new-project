/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const path = require('path')

let dbPath = Application.tmpPath('db.sqlite3')

if (Env.get('NODE_ENV') == 'production'){
  const osAppDataPath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")
  const fs = require("fs");
  const appDataPath = path.join(osAppDataPath, Application.appName)
    
  fs.access(appDataPath, (error) => {
    // To check if the given directory 
    // already exists or not
    if (error) {
      // If current directory does not exist
      // then create it
      fs.mkdir(appDataPath, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("App Data Path Created");
        }
      });
    } else {
      
      console.log("App Data Path already exists !!");
    }
  });
  
  dbPath = path.join(appDataPath, Env.get('DB_NAME'))
}

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | SQLite
    |--------------------------------------------------------------------------
    |
    | Configuration for the SQLite database.  Make sure to install the driver
    | from npm when using this connection
    |
    | npm i sqlite3
    |
    */
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: dbPath,
      },
      migrations: {
        naturalSort: true,
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },

  }
}

export default databaseConfig
