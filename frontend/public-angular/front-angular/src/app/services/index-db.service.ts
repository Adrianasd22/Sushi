// indexed-db.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private dbName = 'sushiDB';
  private dbVersion = 2;

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('categoriesWithProducts')) {
          db.createObjectStore('categoriesWithProducts', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName: string): Promise<any[]> {
    const db = await this.openDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveAll(storeName: string, data: any[]) {
    const db = await this.openDB();

    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    data.forEach((item) => store.put(item));
  }

  async clear(storeName: string) {
    const db = await this.openDB();
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).clear();
  }
}
