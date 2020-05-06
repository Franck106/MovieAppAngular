import { TestBed } from "@angular/core/testing";

import { LocalStorageService } from "./local-storage.service";

describe("LocalStorageService", () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    localStorageService = new LocalStorageService();
  });

  it("should serialize", () => {
    const index = "test";
    const value = { hello: "world" };
    localStorageService.setItem(index, value);
    const result = localStorageService.getItem(index);
    expect(result).toEqual(value);
  });
});
