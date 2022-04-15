import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Global } from './Global';
import { getImages } from 'services/api';
import { mapper } from 'utils/mapper';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchValue } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        const images = await getImages(searchValue, page);
        this.setState(prev => ({
          images: [...prev.images, ...mapper(images.data.hits)],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  onSubmit = text => {
    this.setState({
      searchValue: text,
      images: [],
      page: 1,
    });
  };

  onNextPage = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    return (
      <div>
        <Global />

        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.images.length >= 12 && <Button onBtn={this.onNextPage} />}
      </div>
    );
  }
}
