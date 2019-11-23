function inputProps(addresses) {
    return [
        {
            label: 'Sender',
            inputProps: {
                type: 'select',
                id: 'from-input',
                name: 'from',
                required: true,
            },
            selectElements:addresses,
        },
        {
            label: 'Recipient',
            inputProps: {
                type: 'text',
                id: 'to-input',
                name: 'to',
                maxLength: 42,
                required: true,
            },
            format: function(inputRef) {
                inputRef.value = '0x' + inputRef.value.replace(/0x|[^0-9a-f]/gi, '');
            }
        },
        {
            label: 'Value',
            inputProps: {
                type: 'text',
                id: 'value-input',
                name: 'value',
                required: true,
            },
            format: function(inputRef) {
                inputRef.value = inputRef.value.replace(/[^0-9.]/g, '');
                inputRef.value = inputRef.value.replace(/(\.)\./g, '$1');
                inputRef.value = inputRef.value.replace(/(\d*\.\d{6})[\d.]+/g, '$1');
            }
        }
    ]
}


export default inputProps;