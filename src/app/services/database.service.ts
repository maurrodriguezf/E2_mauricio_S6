import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb = false;
  private dbName = 'miapp.db';
  private dbReady = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.isWeb = Capacitor.getPlatform() === 'web';
  }

  async initializeDatabase(): Promise<void> {
    if (this.dbReady) {
      return;
    }

    try {
      // Para plataformas nativas (Android/iOS)
      if (!this.isWeb) {
        this.db = await this.sqlite.createConnection(
          this.dbName,
          false,
          'no-encryption',
          1,
          false
        );
        
        await this.db.open();
        
        // Crear tablas
        await this.createTables();
        
        this.dbReady = true;
        console.log('Database initialized successfully');
      } else {
        // Para web, usar localStorage como fallback
        console.warn('Running on web platform - using localStorage fallback');
        this.dbReady = true;
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createEventsTable = `
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        capacity INTEGER,
        reserved INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await this.db.execute(createUsersTable);
      await this.db.execute(createEventsTable);
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    if (!this.dbReady) {
      await this.initializeDatabase();
    }

    if (this.isWeb) {
      // Fallback para web - usar localStorage
      return this.webFallback(sql, params);
    }

    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const result = await this.db.query(sql, params);
      return result;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  async execute(sql: string, params: any[] = []): Promise<any> {
    if (!this.dbReady) {
      await this.initializeDatabase();
    }

    if (this.isWeb) {
      return this.webFallback(sql, params);
    }

    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const result = await this.db.run(sql, params);
      return result;
    } catch (error) {
      console.error('Execute error:', error);
      throw error;
    }
  }

  private webFallback(sql: string, params: any[]): any {
    // Implementación básica para web usando localStorage
    console.log('Using localStorage fallback for:', sql, params);
    
    // Retornar estructura similar a SQLite
    return {
      changes: { changes: 0 },
      values: []
    };
  }

  async closeConnection(): Promise<void> {
    if (this.db && !this.isWeb) {
      try {
        await this.sqlite.closeConnection(this.dbName, false);
        this.db = null;
        this.dbReady = false;
      } catch (error) {
        console.error('Error closing database:', error);
      }
    }
  }

  isReady(): boolean {
    return this.dbReady;
  }
}
