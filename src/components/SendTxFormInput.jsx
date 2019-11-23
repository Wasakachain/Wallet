import React from 'react';

class SendTxFormInput extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange({ target }) {
        if(typeof this.props.format === 'function') {
            this.props.format(target);
        }
        if(typeof this.props.inputProps.maxLength === 'number' && target.value) {
            target.value = target.value.substr(0, this.props.inputProps.maxLength)
        }
        this.props.onChange(target);
    }

    render() {
        const { label, inputProps, selectElements } = this.props;
        return (
            <fieldset className="send-tx-fieldset">
                <label className="send-tx-label" htmlFor={inputProps.id}>{label}</label>
                {inputProps.type !== 'select' ? (
                    <input
                        {...inputProps}
                        onChange={this.onChange}
                        className="send-tx-input"
                    />
                ) : (
                    <select
                        {...inputProps}
                        className="send-tx-input"
                        onChange={this.onChange}
                    >
                        {selectElements.map(element => (
                            <option
                                key={`option-${element}`}
                                value={element}
                            >
                                0x{element}
                            </option>
                        ))}
                    </select>
                )}
            </fieldset>
        )
    }
}

export default SendTxFormInput;