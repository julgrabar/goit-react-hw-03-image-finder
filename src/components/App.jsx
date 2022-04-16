import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Global } from './Global';
import { getImages } from 'services/api';
import { mapper } from 'utils/mapper';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchValue } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        this.setState({
          isLoading: true,
        });

        const images = await getImages(searchValue, page);
        this.setState(prev => ({
          images: [...prev.images, ...mapper(images.data.hits)],
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({
          isLoading: false,
        });
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
    const { isLoading, images } = this.state;

    return (
      <div className="App">
        <Global />

        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {images.length >= 12 && isLoading === false && (
          <Button onBtn={this.onNextPage} />
        )}
      </div>
    );
  }
}
