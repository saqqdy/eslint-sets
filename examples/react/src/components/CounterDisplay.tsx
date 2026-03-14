import { useCounter } from '../hooks/useCounter'

export interface CounterDisplayProps {
  initialValue?: number
  max?: number
  min?: number
}

export function CounterDisplay({
  initialValue = 0,
  max = 10,
  min = 0,
}: CounterDisplayProps) {
  const { count, decrement, increment, isMax, isMin, reset } = useCounter({
    initialValue,
    max,
    min,
    step: 1,
  })

  return (
    <div className="counter">
      <h2>Counter Example</h2>
      <p className="count-value">
        {count}
      </p>
      <div className="counter-buttons">
        <button type="button" disabled={isMin} onClick={decrement}>
          -
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" disabled={isMax} onClick={increment}>
          +
        </button>
      </div>
      <p className="counter-status">
        {isMin ? <span>At minimum value</span> : null}
        {isMax ? <span>At maximum value</span> : null}
        {!isMin && !isMax ? <span>Counting...</span> : null}
      </p>
    </div>
  )
}
