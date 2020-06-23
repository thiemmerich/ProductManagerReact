import React, { Component } from 'react';

import './Modal.css';

export default class Modal extends Component {
  //const Modal = ({ show, children, handleClose, titleName }) => {
  //const showHideClassName = show ? "modal display-block" : "modal display-none";

  state = {
    showHideClassName: 'modal display-none'
  }

  componentWillReceiveProps(nextProps) {
    // Typical usage (don't forget to compare props):
    //console.log('Object: ' + this.props.titleName);
    //console.log('NextProps: ' + nextProps.show);
    //console.log('PrevProps: ' + this.props.show);

    if (this.props.show !== nextProps.show) {
      //console.log('NextProps: ' + nextProps.show);
      //console.log('PrevProps: ' + this.props.show);
      this.setState({
        showHideClassName: nextProps.show
      });
    }
  }

  render() {
    return (
      <div className={this.state.showHideClassName}>
        <div className='formTitle'>
          <h1>{this.props.titleName}</h1>
          <button onClick={this.props.handleClose}>X</button>
        </div>
        <section className="modal-main">
          {this.props.children}
        </section>
      </div>
    );
  }
};

//export default Modal;