import mysql from "mysql2/promise";

import { env } from "../config/env.js";

let pool: mysql.Pool | null = null;

export function getMysqlPool() {
  if (!env.MYSQL_HOST || !env.MYSQL_USER || !env.MYSQL_DATABASE) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT ?? 3306,
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10
    });
  }

  return pool;
}

export async function testMysqlConnection() {
  const mysqlPool = getMysqlPool();

  if (!mysqlPool) {
    return {
      configured: false,
      connected: false
    };
  }

  await mysqlPool.query("SELECT 1");

  return {
    configured: true,
    connected: true
  };
}
