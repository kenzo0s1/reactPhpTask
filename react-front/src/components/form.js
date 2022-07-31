import React, {Component} from 'react';
import '../styles/inputForm.scss'
class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {isActive:false}
        this.state = {value: ''};
    }

    changeData = async (element) => {
        await this.setState({value: element.target.value})
        // console.log(this.state.value)
        let obj = {name: element.target.name, value: this.state.value,err:this.props.checkErr}
        this.props.updateData(obj)
        if(!this.state.value){
            this.setState({isActive:false})
        }
    }
    setFocus = () =>{
        this.setState({isActive:true})
        console.log(this.state.isActive)
    }
    getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }
    paste = (e) => {
            let input = e.target,
                inputNumbersValue = this.getInputNumbersValue(input);
        let pasted = e.clipboardData || window.clipboardData;
            if (pasted) {
                let pastedText = pasted.getData('Text');
                if (/\D/g.test(pastedText)) {
                    // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                    // formatting will be in onPhoneInput handler
                    input.value = inputNumbersValue;

                }
            }
        }
    onPhoneInput = (e) => {
        this.setState({isActive:true})
        console.log(this.props.checkErr)
        let input = e.target,
            inputNumbersValue = this.getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length !== selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["1","2","3","4","5","6","7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    onPhoneKeyDown = (e) => {
        // Clear input after remove last symbol
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            e.target.value = "";
        }
    }
    render() {
        if(this.props.type === 'tel'){
            return (
                <div className="input">
                    <label className={(this.state.isActive) ? 'focused' : ''}>
                        <input
                            className={(this.props.checkErr) ? 'err' : ''}
                            onKeyDown={this.onPhoneKeyDown}
                            onPaste={this.paste}
                            pattern={this.props.pattern}
                            onInput={this.onPhoneInput}
                            name={this.props.name}
                            value={this.state.value}
                            onChange={this.changeData}
                            type={this.props.type}/>
                        <span>{this.props.placeHolder}</span>
                    </label>
                </div>
            )
        }
        return (
            <div className="input">
                <label className={(this.state.isActive) ? 'focused' : ''}>
                    <input maxLength="255"
                        className={(this.props.checkErr) ? 'err' : ''}
                        pattern={this.props.pattern}
                        onInput={this.setFocus}
                        name={this.props.name}
                        value={this.state.value}
                        onChange={this.changeData}
                        type={this.props.type}/>
                    <span>{this.props.placeHolder}</span>

                </label>
            </div>
        );
    }
}

export default InputForm;