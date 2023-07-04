import React, { useCallback, useRef } from "react"

import { produce } from "immer"
import { useState } from "react"

const numRows = 35
const numCols = 75

const operations = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
]

const GameGrid = () => {
    const [grid, setGrid] = useState(() => {
        const rows = []
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }

        return rows
    })

    const [running, setRunning] = useState(false)

    const runningRef = useRef()
    runningRef.current = running

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return
        }

        setGrid((currentGrid) => {
            return produce(currentGrid, (gridCopy) => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0
                        operations.forEach(([x, y]) => {
                            const newI = i + x
                            const newK = k + y
                            if (
                                newI >= 0 &&
                                newI < numRows &&
                                newK >= 0 &&
                                newK < numCols
                            ) {
                                neighbors += currentGrid[newI][newK]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0
                        } else if (currentGrid[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1
                        }
                    }
                }
            })
        })

        setTimeout(runSimulation, 100)
    }, [])

    return (
        <>
            <button
                onClick={() => {
                    setRunning(!running)
                    if(!running) {
                        runningRef.current = true
                        runSimulation()
                    }
                }}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600 mb-4">
                {running ? "Stop" : "Start"}
            </button>
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                }}>
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div
                            key={`${i}-${k}`}
                            onClick={() => {
                                const newGrid = produce(grid, (gridCopy) => {
                                    gridCopy[i][k] = gridCopy[i][k] ? 0 : 1
                                })
                                setGrid(newGrid)
                            }}
                            className="w-5 h-5 border border-black m-0"
                            style={{
                                backgroundColor: grid[i][k]
                                    ? "#3730A3"
                                    : undefined,
                            }}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default GameGrid
