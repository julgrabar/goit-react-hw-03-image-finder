import propTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  onImgClick = () => {
    this.setState(prev => ({
      isModalOpen: !prev.isModalOpen,
    }));
  };

  render() {
    const { webformatURL, tags, modalImg } = this.props;
    const { isModalOpen } = this.state;

    return (
      <li>
        <img src={webformatURL} alt={tags} onClick={this.onImgClick} />
        {isModalOpen && (
          <Modal modalImg={modalImg} tags={tags} onClose={this.onImgClick} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: propTypes.string.isRequired,
  modalImg: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
};
