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
   * @param property Name of the property you want to get in the state
   * @returns An Observable emitting the current value and then emitting each change
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
   * Get a property from the state *asynchronously* but *just once*.
   *
   * As it's just once, it won't emit again on changes and you don't need to unsubscribe.
   *
   * @param property Name of the property you want to get in the state
   * @returns An Observable emitting the value you asked just once
   *
   * Example:
   * ```typescript
   * this.store.selectOnce('isAuthenticated').subscribe((isAuthenticated) => {});
   * ```
   */
  selectOnce<T extends keyof State>(property: T): Observable<State[T]> {
    return this.select(property).pipe(first());
  }

  /**
   * @param property Name of the property you want to get in the state
   * @returns The value you asked
   */
  selectSnapshot<T extends keyof State>(property: T): State[T] | undefined {
    return property in this.state
      ? (this.state[property] as State[T])
      : undefined;
  }

  /**
   *
   * @param partialState Object with the properties you want to update
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
