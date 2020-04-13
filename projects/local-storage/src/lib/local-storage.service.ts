import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorage {
  getItem(index: string): unknown {
    let value = null;

    try {
      const unparsedValue = localStorage.getItem(index);
      value = unparsedValue ? JSON.parse(unparsedValue) : null;
    } catch (error) {
      value = null;
    }

    return value;
  }

  setItem(index: string, value: unknown): void {
    localStorage.setItem(index, JSON.stringify(value));
  }

  removeItem(index: string): void {
    localStorage.removeItem(index);
  }

  clear(): void {
    localStorage.clear();
  }
}
