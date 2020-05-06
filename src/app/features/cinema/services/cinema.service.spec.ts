import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CinemaService } from "./cinema.service";

describe("CinemaService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  it("should be created", () => {
    const service = TestBed.inject(CinemaService);
    expect(service).toBeTruthy();
  });
});
