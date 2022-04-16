import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.onBackDropClick}>
        <div className="modal">
          <img src={modalImg} alt={tags} />
        </div>
      </Overlay>,
      document.getElementById('modal-root')
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
