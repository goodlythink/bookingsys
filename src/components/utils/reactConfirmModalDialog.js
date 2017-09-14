import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import { Modal, ModalHeader, Button, ModalBody, ModalFooter } from 'reactstrap';

export default class ReactConfirmModalDialog extends Component {
    state = {
        modal: this.props.show
    }

    static propTypes = {
        type: PropTypes.string, //warning, info
        show: PropTypes.bool,
        title: PropTypes.string,
        message: PropTypes.string,
        confirmLabel: PropTypes.string,
        cancelLabel: PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        children: PropTypes.node,

    };

    static defaultProps = {
        type: 'warning',
        show: false,
        title: '',
        message: '',
        childrenElement: () => null,
        confirmLabel: '',
        cancelLabel: 'ปิด',

    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })

        const target = document.getElementById('react-widget-dialog');
        if (target) {
            target.parentNode.removeChild(target);
        }
    }

    onClickConfirm = () => {
        this.props.onConfirm();
        this.toggle()
    };

    onClickCancel = () => {
        this.props.onCancel();
        this.toggle()
    };

    render() {
        const { title, message, confirmLabel, cancelLabel, type } = this.props;

        let buttonColor, modalColor;
        switch (type) {
            case 'info':
                buttonColor = "info";
                modalColor = "modal-info";
                break;
            default:
                buttonColor = "warning";
                modalColor = "modal-warning";
                break;
        }
        
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={modalColor}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>
                        {message}
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>{cancelLabel}</Button>
                        {confirmLabel && <Button color={buttonColor} onClick={this.onClickConfirm}>{confirmLabel}</Button>}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

function createElementDialog(properties) {
    const divTarget = document.createElement('div');
    divTarget.id = 'react-widget-dialog';
    document.body.appendChild(divTarget);
    render(<ReactConfirmModalDialog {...properties} />, divTarget);
}

export function confirmModalDialog(properties) {
    createElementDialog(properties);
}