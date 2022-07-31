import React, {Component} from 'react';
import '../styles/button.scss'
class Btn extends Component {
    render() {
        return (
                <button className={'button'}>{this.props.text}</button>
        );
    }
}

export default Btn;