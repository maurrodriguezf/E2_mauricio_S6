import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseService]
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize on web platform', async () => {
    await service.initializeDatabase();
    expect(service.isReady()).toBeTrue();
  });

  it('should handle query execution on web', async () => {
    await service.initializeDatabase();
    const result = await service.query('SELECT * FROM users', []);
    expect(result).toBeDefined();
  });

  it('should handle execute on web', async () => {
    await service.initializeDatabase();
    const result = await service.execute('INSERT INTO users VALUES (?, ?, ?)', ['test', 'test@test.com', 'pass']);
    expect(result).toBeDefined();
  });

  it('should return ready status', () => {
    expect(service.isReady()).toBeDefined();
  });

  it('should handle close connection', async () => {
    await service.initializeDatabase();
    await service.closeConnection();
    expect(true).toBeTrue(); // No debe lanzar error
  });

  it('should initialize database before query if not ready', async () => {
    const result = await service.query('SELECT 1', []);
    expect(service.isReady()).toBeTrue();
    expect(result).toBeDefined();
  });

  it('should initialize database before execute if not ready', async () => {
    const result = await service.execute('CREATE TABLE test (id INT)', []);
    expect(service.isReady()).toBeTrue();
    expect(result).toBeDefined();
  });
});
