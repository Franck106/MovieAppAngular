import { MoviesItemComponent } from "./movies-item.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("MovieItemComponent", () => {
  let component: MoviesItemComponent;
  let fixture: ComponentFixture<MoviesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
