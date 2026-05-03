import { TestBed } from '@angular/core/testing';

import { SessionStorageService, SESSION_STORAGE } from './session-storage.service';

describe('SessionStorageService', () => {
  it('returns null when sessionStorage is unavailable', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SESSION_STORAGE, useValue: null }],
    });

    const service = TestBed.inject(SessionStorageService);
    expect(service.getItem('k')).toBeNull();
  });

  it('parses JSON objects and keeps primitive strings', () => {
    const storage = {
      getItem: vi.fn((key: string) => {
        if (key === 'obj') return JSON.stringify({ a: 1 });
        if (key === 'str') return 'hello';
        if (key === 'num') return '123';
        return null;
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    } as unknown as Storage;

    TestBed.configureTestingModule({
      providers: [{ provide: SESSION_STORAGE, useValue: storage }],
    });

    const service = TestBed.inject(SessionStorageService);
    expect(service.getItem<{ a: number }>('obj')).toEqual({ a: 1 });
    expect(service.getItem('str')).toBe('hello');
    expect(service.getItem<number>('num')).toBe('123');
    expect(service.getItem('missing')).toBeNull();
  });

  it('serializes objects and removes keys', () => {
    const storage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    } as unknown as Storage;

    TestBed.configureTestingModule({
      providers: [{ provide: SESSION_STORAGE, useValue: storage }],
    });

    const service = TestBed.inject(SessionStorageService);
    service.setItem('obj', { a: 1 });
    service.setItem('str', 'hello');
    service.removeItem('obj');

    expect(storage.setItem).toHaveBeenCalledWith('obj', JSON.stringify({ a: 1 }));
    expect(storage.setItem).toHaveBeenCalledWith('str', 'hello');
    expect(storage.removeItem).toHaveBeenCalledWith('obj');
  });
});

