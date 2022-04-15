import { Component } from 'react';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    isLoading: false,
  };

  render() {
    return (
      <>
        <List>
          {this.props.images.map(
            ({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
              />
            )
          )}
        </List>
      </>
    );
  }
}
