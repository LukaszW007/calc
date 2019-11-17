import React from 'react';
import logo from './logo.svg';
import './App.css';

class DigitButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(this.props.digit);
    }

    render() {
        return <button onClick={this.handleClick}> {this.props.digit} </button>;
    }
}

class OperationButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(this.props.operation);
    }

    render() {
        return <button onClick={this.handleClick}> {this.props.operation} </button>;
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleDigitClick = this.handleDigitClick.bind(this);
        this.handleOperationClick = this.handleOperationClick.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this);
        this.update = this.update.bind(this);

        this.state = {
            tempResult: "",
            fieldValue: "",
            prevFieldValue: "",
            operation: "",
            input: '',
            tempPrevStateFieldValue: '',
            tempPrevStateInput: '',
        };
    }

    update(e) {
        if (!this.state.prevFieldValue) {
            e.target.value = '';
        }
    }

    clearInput() {
        if (!this.state.operation) {
            this.setState({
                input: '',
            });
        }
    }

    handleDigitClick(digit) {
        console.log(`APP: Digit clicked: ${digit}`);
        this.clearInput();
        this.setState(prevState => ({
            fieldValue: prevState.fieldValue + digit,
        }));
        console.log('1: ', this.state);
        this.setState(prevState => ({
            tempPrevStateFieldValue: prevState.fieldValue,
            tempPrevStateInput: prevState.input,
            input: this.state.input + digit,
        }));
        console.log('2: ', this.state);
    }

    switchAmongOperations(operation) {
        let result = 0;
        var prevFieldValue = '';

        if (!this.state.tempResult) {
            prevFieldValue = this.state.prevFieldValue;
        } else {
            prevFieldValue = this.state.tempResult;
        }
        console.log('prevFieldValue: ' + prevFieldValue);

        switch (operation) {
            case "+":
                result = parseInt(prevFieldValue) + parseInt(this.state.fieldValue);
                break;
            case "-":
                result = parseInt(prevFieldValue) - parseInt(this.state.fieldValue);
                break;
            case "*":
                result = parseInt(prevFieldValue) * parseInt(this.state.fieldValue);
                break;
            case "/":
                result = parseInt(prevFieldValue) / parseInt(this.state.fieldValue);
                break;
        }
        return result;
    }

    handleOperationClick(operation) {
        console.log(`APP: Operation clicked: ${operation}`);

        if (this.state.operation === '') {
            this.setState(prevState => ({
                prevFieldValue: prevState.fieldValue,
                fieldValue: "",
                operation: operation,
                input: prevState.fieldValue + ' ' + operation + ' ',
            }));
        } else {
            let result = this.switchAmongOperations(this.state.operation);

            console.log('input ze state: ' + this.state.input);
            this.setState(prevState => ({
                tempResult: result,
                prevFieldValue: prevState.fieldValue,
                fieldValue: "",
                input: prevState.input + ' ' + operation + ' ',
            }));
        }
    }

    handleResultClick() {
        console.log("APP: Result clicked", this.state);

        let result = this.switchAmongOperations(this.state.operation);

        this.setState({
            fieldValue: result,
            prevFieldValue: "",
            operation: "",
            tempResult: '',
            input: result,
        });
    }

    render() {
        const {fieldValue, prevFieldValue, operation, input} = this.state;
        console.log(this.state);
        return (
            <div>
            <table>
            <tbody>
            <tr><td colSpan="4"><input type="text" disabled value={this.state.input} /></td></tr>
        <tr>
        <td><DigitButton onClick={this.handleDigitClick} digit={1} /></td>
        <td><DigitButton onClick={this.handleDigitClick} digit={2} /></td>
        <td><DigitButton onClick={this.handleDigitClick} digit={3} /></td>
        <td><OperationButton onClick={this.handleOperationClick} operation="+" /></td>
            </tr>
            <tr>
            <td><DigitButton onClick={this.handleDigitClick} digit={4} /></td>
        <td><DigitButton onClick={this.handleDigitClick} digit={5} /></td>
        <td><DigitButton onClick={this.handleDigitClick} digit={6} /></td>
        <td><OperationButton onClick={this.handleOperationClick} operation="-" /></td>
            </tr>
            <tr>
            <td><DigitButton onClick={this.handleDigitClick} digit={7} /></td>
        <td><DigitButton onClick={this.handleDigitClick} digit={8} /></td>
        <td><DigitButton onClick={this.handleDigitClick} digit={9} /></td>
        <td><OperationButton onClick={this.handleOperationClick} operation="*" /></td>
            </tr>
            <tr>
            <td colSpan="2"><DigitButton onClick={this.handleDigitClick} digit={0} /></td>
        <td><OperationButton onClick={this.handleResultClick} operation="=" /></td>
            <td><OperationButton onClick={this.handleOperationClick} operation="/" /></td>
            </tr>
            </tbody>
            </table>
            </div>
        );
    }
}


export default App;
