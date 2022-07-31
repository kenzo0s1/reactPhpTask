import React, {Component} from 'react';
import '../styles/newsBlock.scss'
class BlockWithNews extends Component {
    render() {
        return (
            <div className='newsBlock'>
                <h1>{this.props.name}</h1>
                <p>{this.props.text}
                </p>
                <h4>{this.props.data}</h4>
            </div>
        );
    }
}

export default BlockWithNews;