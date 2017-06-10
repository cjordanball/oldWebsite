import React from 'react';
import classNames from 'classnames';
import {sudokuSolver} from '../sudokuLogic/init';

class Board extends React.Component {
    constructor() {
        super();
        this.data = {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }

    clickHandler() {
        let inList = document.getElementsByTagName('input');
        let inArr = Array.from(inList);
        inArr.forEach((val) => {
            val.classList.remove('alarm', 'blue');
            if (val.value.length > 1 || (!(/^[1-9]?$/.test(val.value)))) {
                val.classList.add('alarm')
            }
        })
        if (inArr.some((val) => val.classList.contains('alarm'))) {
                console.log('Buzzah!')
        } else {
            inArr = inArr.map((val) => {
                if (/\d/.test(val.value)) {
                    val.classList.add('blue');
                }
                return val.value === '' ? '-' : val.value;
            });
            let solution = sudokuSolver(inArr);
            let inArr2 = Array.from(inList);
            inArr2.forEach(function(val, ind) {
                val.value = solution[ind];
            })
        }
    }

    clearAll() {
        let inList = document.getElementsByTagName('input');
        let inArr = Array.from(inList);
        inArr.forEach((val) => {
            val.classList.remove('blue', 'alarm');
            val.value = '';
        })
    }

    render() {
        let list = this.data.numbers.map((val, ind) => {
            return (
                <div key={ind}>
                    <Row row={val} />
                </div>
            )
        })

        return (
            <div>
                <div>
                    {list}
                </div>
                <div>
                    <button onClick={this.clickHandler}>Show Solution</button>
                    <button onClick={this.clearAll}>Clear Board</button>
                </div>
            </div>
        )
    }
}

class Row extends React.Component {
    constructor() {
        super();
        this.data = {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }
    render() {
        let list = this.data.numbers.map((val, ind) => {
            return <Box row={this.props.row} col={val} key={ind} />
        });
        return (
            <div>
                {list}
            </div>
        )
    }
}

class Box extends React.Component {
    render() {
        let classList = classNames({
            'grid': true,
            'left': this.props.col === 1,
            'right': this.props.col === 9,
            'top': this.props.row === 1,
            'bottom': this.props.row === 9,
            'rowline': this.props.row < 8 && this.props.row % 3 === 0,
            'colline': this.props.col < 8 && this.props.col % 3 === 0
        });

        return <input type='text' pattern="^\d$" className={classList}/>
    }
}

export default Board;
