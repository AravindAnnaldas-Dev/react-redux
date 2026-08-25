import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import {
  increment,
  decrement,
  incrementByCustomValue,
  decrementByCustomValue,
  reset,
} from "../features/counter/counterSlice";

const CounterComp = () => {
  const value = 7;
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 border-b border-b-white">
      <p className="text-3xl font-semibold">Count: {count}</p>
      <div className="flex gap-2">
        <button
          className="cursor-pointer rounded border px-3 py-1"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="cursor-pointer rounded border px-3 py-1"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="cursor-pointer rounded border px-3 py-1"
          onClick={() => dispatch(incrementByCustomValue(value))}
        >
          Increment by {value}
        </button>
        <button
          className="cursor-pointer rounded border px-3 py-1"
          onClick={() => dispatch(decrementByCustomValue(value))}
        >
          Decrement by {value}
        </button>
        <button
          className="cursor-pointer rounded border px-3 py-1"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterComp;
