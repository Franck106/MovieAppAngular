import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { State, stateDefaults } from "./state";
import { map, filter, distinctUntilChanged, first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private store = new ReplaySubject<Partial<State>>(1);
  private state: Partial<State>;

  constructor() {
    this.dispatch(stateDefaults);
  }

  /**
   * @param
   * @returns
   */
  select<T extends keyof State>(property: T): Observable<State[T]> {
    return this.store.pipe(
      map((state) => state[property] as State[T]),
      filter(
        <U>(value: U): value is Exclude<U, undefined> => value !== undefined
      ),
      distinctUntilChanged()
    );
  }

  /**
   * @param
   * @returns
   */
  selectOnce<T extends keyof State>(property: T): Observable<State[T]> {
    return this.select(property).pipe(first());
  }

  /**
   * @param
   * @returns
   */
  selectSnapshot<T extends keyof State>(property: T): State[T] | undefined {
    return property in this.state
      ? (this.state[property] as State[T])
      : undefined;
  }

  /**
   *
   * @param partialState
   */
  dispatch(partialState: Partial<State>): void {
    try {
      const flatPartialState = JSON.parse(
        JSON.stringify(partialState)
      ) as Partial<State>;
      this.state = { ...this.state, ...flatPartialState };
      this.store.next(this.state);
    } catch {}
  }
}
