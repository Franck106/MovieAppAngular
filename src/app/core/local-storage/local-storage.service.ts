import { Injectable, Inject } from "@angular/core";
import { LS_PREFIX } from "projects/local-storage/src/lib/token";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor(@Inject(LS_PREFIX) private prefix = "") {}

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
