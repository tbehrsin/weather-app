
import * as React from "react";

declare module "react" {
  function createRef<T>(): IRef<T>;

  interface IRef<T> {
    readonly current: T | null;
  }
}
