import React from 'react';
import { wordlists } from 'bip39';


class MnemonicWordInput extends React.Component {

    constructor(props) {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            word: typeof props.word === 'string' ? props.word : '',
            error: typeof props.word === 'string' ? !wordlists.EN.includes(props.word) : false
        }
    }

    onChange({ target }) {
        target.value = target.value ? target.value.replace(/[^a-z]/g, '') : target.value;
        const error = target.value ? !wordlists.EN.includes(target.value) : true;
        this.setState({ word: target.value, error})
        this.props.onChange(this.props.index, target.value, error);
    }

    render() {
        const { index, showError } = this.props;
        const { error, word } = this.state;
        return (
            <fieldset
                key={`mnemonic-word-${index}`}
                id={`from-mnemonic-fieldset-${index}`}
                className={`from-mnemonic-fieldset${error && showError ? ' bad-word' : ''}`}
            >
                <label
                    htmlFor={`mnemonic-word-${index}`}
                    id={`from-mnemonic-label-${index}`}
                    className="from-mnemonic-label"
                >
                    {index + 1}
                </label>
                <input
                    required
                    value={word}
                    onChange={this.onChange}
                    id={`mnemonic-word-${index}`}
                    className="from-mnemonic-input"
                    maxLength={8}
                    data-word-index={index}
                />
            </fieldset>
        )
    }
}

export default MnemonicWordInput;